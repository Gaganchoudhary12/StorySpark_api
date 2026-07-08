import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  mood: string;
  relationship: string;
  theme: string;
  title: string;
  characters: Array<{ name: string; description: string }>;
  setting: string;
  conversation: Array<{ speaker: string; text: string }>;
  createdAt: Date;
}

const storySchema = new Schema<IStory>({
  mood: { type: String, required: true },
  relationship: { type: String, required: true },
  theme: { type: String, required: true },
  title: { type: String, required: true },
  characters: [{ name: String, description: String }],
  setting: { type: String, required: true },
  conversation: [{ speaker: String, text: String }],
  createdAt: { type: Date, default: Date.now }
});

export const StoryModel = mongoose.model<IStory>('Story', storySchema);
