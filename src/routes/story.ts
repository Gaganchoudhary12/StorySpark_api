import { Router } from 'express';
import { createStory, getSavedStories } from '../controllers/storyController';

const router = Router();
router.post('/story', createStory);
router.get('/stories', getSavedStories);

export default router;
