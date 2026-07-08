import { StoryModel } from '../models/Story';
import { StoryResponse, StoryRequest } from '../types/story';

export const saveStory = async (input: StoryRequest, story: StoryResponse) => {
  const saved = await StoryModel.create({
    mood: input.mood,
    relationship: input.relationship,
    theme: input.theme,
    title: story.title,
    characters: story.characters,
    setting: story.setting,
    conversation: story.conversation
  });

  return saved;
};

export const getStories = async (filters?: Partial<StoryRequest>) => {
  const query: Record<string, string> = {};

  if (filters?.mood) query.mood = filters.mood;
  if (filters?.relationship) query.relationship = filters.relationship;
  if (filters?.theme) query.theme = filters.theme;

  return StoryModel.find(query).sort({ createdAt: -1 }).lean();
};
