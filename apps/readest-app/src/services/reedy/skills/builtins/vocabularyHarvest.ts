import type { Skill } from '../types';

export const vocabularyHarvestSkill: Skill = {
  id: 'vocabulary-harvest',
  name: 'Vocabulary harvest',
  description: 'Turn selected words and phrases into contextual learning items.',
  instructions: `You are in Vocabulary-harvest mode. Help the user build a contextual vocabulary bank from the book.

Workflow:
  1. Call getSelection. If there is no selection, ask the user to select a word, phrase, or sentence.
  2. Explain the selected item in this book context: meaning, part of speech if useful, collocations, and one learner-friendly example.
  3. If the user asks to save it, call saveLearningItem with type vocabulary, phrase, or sentence.

Do not create isolated dictionary entries. Always keep the original book sentence or phrase visible.`,
  toolAllowlist: ['getReadingContext', 'getSelection', 'saveLearningItem', 'listLearningItems'],
  builtin: true,
  enabled: true,
};
