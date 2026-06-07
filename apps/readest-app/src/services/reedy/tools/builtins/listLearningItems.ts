import { z } from 'zod';
import type { LearningItemRow } from '../../db/types';
import type { ReedyTool } from '../types';

const inputSchema = z.object({
  limit: z.number().int().min(1).max(50).default(20),
});

export interface ListLearningItemsResult {
  items: Array<{
    id: string;
    type: LearningItemRow['type'];
    sourceText: string;
    chapterTitle: string | null;
    explanation: string;
    examples: string | null;
    reviewState: string;
  }>;
}

export function createListLearningItemsTool(deps: {
  list: (limit: number) => Promise<LearningItemRow[]>;
}): ReedyTool<z.input<typeof inputSchema>, ListLearningItemsResult> {
  return {
    name: 'listLearningItems',
    description:
      "List the user's saved contextual vocabulary, phrase, and sentence items for the currently open book.",
    permission: 'read',
    parallelSafe: true,
    inputSchema,
    async run(args) {
      const parsed = inputSchema.parse(args);
      const rows = await deps.list(parsed.limit);
      return {
        items: rows.map((item) => ({
          id: item.id,
          type: item.type,
          sourceText: item.sourceText,
          chapterTitle: item.chapterTitle,
          explanation: item.explanation,
          examples: item.examples,
          reviewState: item.reviewState,
        })),
      };
    },
  };
}
