export const buildStoryPrompt = (mood: string, relationship: string, theme: string, language: string) => `
Generate a complete couple roleplay script.

Inputs:
Mood: ${mood}
Relationship: ${relationship}
Theme: ${theme}
Language: ${language}

Requirements:
Create an engaging title.
Create exactly two characters.
Give each character: name and description.
Describe the setting.
Write the entire story, title, setting, and conversation in ${language}.
Generate between 60 and 100 alternating dialogue exchanges.
Dialogue should feel natural.
Create emotional progression.
Include conflict.
Include one unexpected twist.
Create a satisfying climax.
Finish the story naturally.
No narration between every line.
Only occasional stage directions.
Keep each dialogue between 1 and 3 sentences.
Return ONLY valid JSON.

JSON format:
{
  "title":"",
  "characters":[
    {"name":"","description":""},
    {"name":"","description":""}
  ],
  "setting":"",
  "conversation":[
    {"speaker":"","text":""}
  ]
}
`;
