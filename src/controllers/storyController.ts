import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { generateStory } from '../services/storyService';
import { getStoryOptions as getStoryOptionsFromDb } from '../services/storyOptionsService';
import { saveStory, getStories } from '../services/storyStorageService';
import { clearCache } from '../middleware/cache';
import { AppError } from '../middleware/errorHandler';

const storySchema = z.object({
  mood: z.string().min(1),
  relationship: z.string().min(1),
  theme: z.string().min(1),
  language: z.string().min(1)
});

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('[StoryController] Received request body:', req.body);
    const parsed = storySchema.safeParse(req.body);
    if (!parsed.success) {
      console.error('[StoryController] Validation failed:', parsed.error);
      throw new AppError('Please choose a mood, relationship, theme, and language before generating a story.', 400);
    }

    console.log('[StoryController] Starting story generation for:', parsed.data);
    const story = await generateStory(parsed.data);
    console.log('[StoryController] Story generated successfully');
    
    console.log('[StoryController] Saving story to database');
    const saved = await saveStory(parsed.data, story);
    console.log('[StoryController] Story saved with ID:', saved._id);

    return res.json({
      ...story,
      savedId: saved._id,
      mood: parsed.data.mood,
      relationship: parsed.data.relationship,
      theme: parsed.data.theme,
      language: parsed.data.language
    });
  } catch (error) {
    console.error('[StoryController] Error creating story:', error);
    next(error);
  }
};

export const getSavedStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = storySchema.partial().safeParse(req.query);
    const filters = query.success ? query.data : undefined;
    const stories = await getStories(filters);
    return res.json(stories);
  } catch (error) {
    next(error);
  }
};

export const getStoryOptions = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const options = await getStoryOptionsFromDb();
    return res.json(options);
  } catch (error) {
    next(error);
  }
};

export const clearApiCache = (_req: Request, res: Response, next: NextFunction) => {
  try {
    clearCache();

    return res.json({
      success: true,
      cleared: 'all'
    });
  } catch (error) {
    next(error);
  }
};
