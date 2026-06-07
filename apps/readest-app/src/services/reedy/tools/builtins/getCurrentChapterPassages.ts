import { z } from 'zod';
import type { ReedyDb } from '../../db/ReedyDb';
import type { ReedyTool } from '../types';
import type { ReadingContextSnapshot } from './types';

const inputSchema = z.object({
  limit: z.number().int().min(1).max(30).default(12),
});

export interface CurrentChapterPassagesResult {
  status: 'ok' | 'not_indexed' | 'empty_index';
  chapterTitle: string | null;
  sectionIndex: number;
  passages: Array<{
    cfi: string;
    endCfi: string;
    text: string;
    positionIndex: number;
  }>;
}

export function createGetCurrentChapterPassagesTool(deps: {
  reedy: ReedyDb;
  readingContext: () => ReadingContextSnapshot;
}): ReedyTool<z.input<typeof inputSchema>, CurrentChapterPassagesResult> {
  return {
    name: 'getCurrentChapterPassages',
    description:
      'Return indexed passages from the section/chapter the user is currently reading. Use this for chapter checks and retelling feedback.',
    permission: 'read',
    parallelSafe: true,
    inputSchema,
    async run(args, ctx) {
      const parsed = inputSchema.parse(args);
      const reading = deps.readingContext();
      const meta = await deps.reedy.getBookMeta(ctx.bookHash);
      if (!meta || meta.indexingStatus !== 'indexed') {
        return {
          status: 'not_indexed',
          chapterTitle: reading.chapterTitle,
          sectionIndex: reading.sectionIndex,
          passages: [],
        };
      }
      if (meta.chunkCount === 0) {
        return {
          status: 'empty_index',
          chapterTitle: reading.chapterTitle,
          sectionIndex: reading.sectionIndex,
          passages: [],
        };
      }

      const rows = await deps.reedy.getChunksBySection({
        bookHash: ctx.bookHash,
        sectionIndex: reading.sectionIndex,
        limit: parsed.limit,
      });
      return {
        status: rows.length > 0 ? 'ok' : 'empty_index',
        chapterTitle: reading.chapterTitle,
        sectionIndex: reading.sectionIndex,
        passages: rows.map((row) => ({
          cfi: row.startCfi,
          endCfi: row.endCfi,
          text: row.text,
          positionIndex: row.positionIndex,
        })),
      };
    },
  };
}
