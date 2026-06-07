import { chapterCheckSkill } from './chapterCheck';
import { chapterSummarySkill } from './chapterSummary';
import { englishCoachSkill } from './englishCoach';
import { quoteFinderSkill } from './quoteFinder';
import { retellCoachSkill } from './retellCoach';
import { sentenceXraySkill } from './sentenceXray';
import { spoilerFreeSkill } from './spoilerFree';
import { vocabularyHarvestSkill } from './vocabularyHarvest';
import type { Skill } from '../types';

export const BUILTIN_SKILLS: Skill[] = [
  spoilerFreeSkill,
  chapterSummarySkill,
  quoteFinderSkill,
  englishCoachSkill,
  sentenceXraySkill,
  chapterCheckSkill,
  retellCoachSkill,
  vocabularyHarvestSkill,
];

export {
  spoilerFreeSkill,
  chapterSummarySkill,
  quoteFinderSkill,
  englishCoachSkill,
  sentenceXraySkill,
  chapterCheckSkill,
  retellCoachSkill,
  vocabularyHarvestSkill,
};
