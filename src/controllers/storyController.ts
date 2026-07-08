import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { generateStory } from '../services/storyService';

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
    return res.json(story);
  } catch (error) {
    next(error);
  }
};
