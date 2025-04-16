# TS Finder - Taylor Swift Song Discovery App

A full-stack web application that helps Taylor Swift fans discover songs and lyrics that match their current vibe using AI-powered mood analysis.

## Features

- Mood-based song recommendations using image or text input
- Integration with Spotify for song previews
- Lyrics display and analysis
- Community forum for Swifties
- User authentication and profiles

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python
- **Database**: PostgreSQL
- **Authentication**: Firebase Auth
- **APIs**: 
  - Google Cloud Vision API (image analysis)
  - OpenAI/Cohere API (text analysis)
  - Spotify Web API
  - Genius/Musixmatch API (lyrics)

## Project Structure

```
ts-finder/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # FastAPI backend
├── packages/
│   └── types/        # Shared TypeScript types
└── package.json      # Root package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Python (v3.9 or later)
- pnpm
- PostgreSQL
- API keys for required services

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ts-finder.git
   cd ts-finder
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `apps/web` and `apps/api` directories
   - Add required API keys and configuration

4. Start the development servers:
   ```bash
   pnpm dev
   ```

## Development

- Frontend runs on http://localhost:3000
- Backend API runs on http://localhost:8000
- API documentation available at http://localhost:8000/docs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 