import { GoogleGenerativeAI } from '@google/generative-ai';
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
  const model = getModel();
  const prompt = buildStoryPrompt(input.mood, input.relationship, input.theme);

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const json = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(json) as StoryResponse;

  return parsed;
};
