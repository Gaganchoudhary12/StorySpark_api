import { StoryOptionsModel } from '../models/StoryOptions';

export const getStoryOptions = async () => {
  const existing = await StoryOptionsModel.findOne().lean();

  if (existing) {
    return {
      moods: existing.moods,
      relationships: existing.relationships,
      themes: existing.themes,
      languages: existing.languages
    };
  }
};
