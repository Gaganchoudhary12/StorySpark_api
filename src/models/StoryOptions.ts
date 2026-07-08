import mongoose, { Document, Schema } from 'mongoose';

export interface IStoryOptions extends Document {
  moods: string[];
  relationships: string[];
  themes: string[];
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
}

const storyOptionsSchema = new Schema<IStoryOptions>(
  {
    moods: [{ type: String, required: true }],
    relationships: [{ type: String, required: true }],
    themes: [{ type: String, required: true }],
    languages: [{ type: String, required: true }]
  },
  {
    timestamps: true
  }
);

export const StoryOptionsModel = mongoose.model<IStoryOptions>('StoryOptions', storyOptionsSchema);
