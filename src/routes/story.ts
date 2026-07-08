import { Router } from 'express';
import { createStory, getSavedStories, getStoryOptions } from '../controllers/storyController';
import { cache } from '../middleware/cache';

const router = Router();
router.get('/story-options', cache('30 min'), getStoryOptions);
router.post('/story', createStory);
router.get('/stories',cache('30 min'), getSavedStories);

export default router;
