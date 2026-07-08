import { Router } from 'express';
import { createStory } from '../controllers/storyController';

const router = Router();
router.post('/story', createStory);

export default router;
