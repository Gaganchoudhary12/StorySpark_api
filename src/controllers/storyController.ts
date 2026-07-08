import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { generateStory } from '../services/storyService';
import { saveStory, getStories } from '../services/storyStorageService';

const storySchema = z.object({
  mood: z.string().min(1),
  relationship: z.string().min(1),
  theme: z.string().min(1)
});

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = storySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const story = await generateStory(parsed.data);
    const saved = await saveStory(parsed.data, story);

    return res.json({
      ...story,
      savedId: saved._id,
      mood: parsed.data.mood,
      relationship: parsed.data.relationship,
      theme: parsed.data.theme
    });
  } catch (error) {
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
