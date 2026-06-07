import { z } from 'zod';
import type { LearningItemRow, LearningItemWriteArgs } from '../../db/types';
import type { ReedyTool } from '../types';
import type { ReadingContextSnapshot } from './types';

const inputSchema = z.object({
  type: z.enum(['vocabulary', 'phrase', 'sentence']),
  sourceText: z.string().min(1).max(2_000),
  explanation: z.string().min(1).max(4_000),
  examples: z.string().max(4_000).optional(),
});

export interface SaveLearningItemResult {
  id: string;
  type: LearningItemRow['type'];
  sourceText: string;
}

export function createSaveLearningItemTool(deps: {
  save: (args: Omit<LearningItemWriteArgs, 'bookHash'>) => Promise<LearningItemRow>;
  readingContext: () => ReadingContextSnapshot;
}): ReedyTool<z.input<typeof inputSchema>, SaveLearningItemResult> {
  return {
    name: 'saveLearningItem',
    description:
      'Save a selected vocabulary item, phrase, or sentence to the contextual English learning bank for this book. Use only when the user asks to save or collect it.',
    permission: 'write',
    parallelSafe: false,
    inputSchema,
    async run(args) {
      const parsed = inputSchema.parse(args);
      const reading = deps.readingContext();
      const item = await deps.save({
        type: parsed.type,
        sourceText: parsed.sourceText,
        sourceCfi: reading.selection?.startCfi ?? reading.cfi,
        chapterTitle: reading.chapterTitle,
        explanation: parsed.explanation,
        examples: parsed.examples ?? null,
      });
      return {
        id: item.id,
        type: item.type,
        sourceText: item.sourceText,
      };
    },
  };
}
