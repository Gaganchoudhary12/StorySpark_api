# StorySpark API

## Setup

1. Install dependencies:
   `npm install`
2. Create a `.env` file from `.env.example` and add your Gemini API key; the included MongoDB URI already targets the `StorySpark` database.
3. Start the server:
   `npm run dev`

The API exposes `POST /api/story` for generating roleplay stories.
