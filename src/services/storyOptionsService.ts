import { AppError } from '../middleware/errorHandler';
import { StoryOptionsModel } from '../models/StoryOptions';

export interface StoryOptionsResponse {
  moods: string[];
  relationships: string[];
  themes: string[];
  languages: string[];
}

export const getStoryOptions = async () => {
  const existing = await StoryOptionsModel.findOne()
    .sort({ updatedAt: -1, createdAt: -1 })
    .lean();

  if (!existing) {
    throw new AppError('Story options are not configured in the database.', 500);
  }

  return {
    moods: existing.moods,
    relationships: existing.relationships,
    themes: existing.themes,
    languages: existing.languages
  } satisfies StoryOptionsResponse;
};
