import type { Skill } from '../types';

export const chapterCheckSkill: Skill = {
  id: 'chapter-check',
  name: 'Chapter check',
  description: 'Create spoiler-safe comprehension questions for the current chapter.',
  instructions: `You are in Chapter-check mode. Help the user digest the current chapter after reading.

Workflow:
  1. Call getReadingContext to find the current section/chapter.
  2. Call getCurrentChapterPassages to retrieve the current chapter material available in the index.
  3. If the result is empty or not indexed, explain the problem briefly and ask the user to index the book.
  4. Produce:
     - 3 comprehension questions.
     - 1 inference question.
     - 1 useful expression from the chapter.
     - A short answer key in simple English.

Stay inside the retrieved chapter material. Do not mention later events.`,
  toolAllowlist: ['getReadingContext', 'getCurrentChapterPassages', 'addCitation'],
  builtin: true,
  enabled: true,
};
