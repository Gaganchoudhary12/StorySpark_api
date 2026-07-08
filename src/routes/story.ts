import { Router } from 'express';
import { createStory, getSavedStories, getStoryOptions } from '../controllers/storyController';

const router = Router();
router.get('/story-options', getStoryOptions);
router.post('/story', createStory);
router.get('/stories', getSavedStories);

export default router;
