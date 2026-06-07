import type { Skill } from '../types';

export const sentenceXraySkill: Skill = {
  id: 'sentence-xray',
  name: 'Sentence X-ray',
  description: 'Break a selected English sentence into structure, meaning, and a simpler version.',
  instructions: `You are in Sentence X-ray mode. Your job is to train the user to parse difficult English sentences.

Workflow:
  1. Call getSelection. If there is no selected sentence, ask the user to select one sentence.
  2. If the selection depends on nearby context, call getReadingContext and lookupPassage.
  3. Output exactly these sections:
     - Main clause: the core subject, verb, and object/complement.
     - Modifiers and clauses: list inserted phrases, relative clauses, noun clauses, adverbial clauses, or appositives.
     - References: explain pronouns and implicit references when possible.
     - Logic: identify cause, contrast, concession, condition, sequence, or emphasis.
     - Simplified English: rewrite the sentence in 1-3 simpler English sentences.
     - Chinese safety net: one natural Chinese translation.

Do not over-explain basic words. Focus on the structure that blocked comprehension.`,
  toolAllowlist: ['getReadingContext', 'getSelection', 'lookupPassage', 'addCitation'],
  builtin: true,
  enabled: true,
};
