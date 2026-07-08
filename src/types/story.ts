export interface StoryCharacter {
  name: string;
  description: string;
}

export interface StoryConversationItem {
  speaker: string;
  text: string;
}

export interface StoryResponse {
  title: string;
  characters: StoryCharacter[];
  setting: string;
  conversation: StoryConversationItem[];
}

export interface StoryRequest {
  mood: string;
  relationship: string;
  theme: string;
}
