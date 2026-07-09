import { GoogleGenerativeAI } from '@google/generative-ai';
import { AppError } from '../middleware/errorHandler';
import { buildStoryPrompt } from '../prompts/storyPrompt';
import { StoryRequest, StoryResponse } from '../types/story';

const getModel = () => {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY or GOOGLE_API_KEY is not configured');

  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    generationConfig: { temperature: 0.9 }
  });
};

export const generateStory = async (input: StoryRequest): Promise<StoryResponse> => {
  try {
    const model = getModel();
    const prompt = buildStoryPrompt(input.mood, input.relationship, input.theme, input.language);

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const json = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(json) as StoryResponse;

    return parsed;
  } catch (error) {
    console.error('[StoryService] Error generating story:', error);

    if (error instanceof SyntaxError) {
      throw new AppError('The story service returned an invalid response. Please try again.', 502);
    }

    if (error instanceof Error && error.message.includes('not configured')) {
      throw new AppError('The story service is not configured on the server yet.', 500);
    }

    throw new AppError('We could not generate your story right now. Please try again in a moment.', 502);
  }
};
