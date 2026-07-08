import { Router } from 'express';
import { clearApiCache, createStory, getSavedStories, getStoryOptions } from '../controllers/storyController';
import { cache } from '../middleware/cache';

const router = Router();
router.get('/story-options', getStoryOptions);
router.post('/story', createStory);
router.post('/cache/clear', clearApiCache);
router.get('/stories',cache('30 min'), getSavedStories);

export default router;
