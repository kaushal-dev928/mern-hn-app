# MERN Hacker News Scraper

## Features
- Scrapes top 10 stories from Hacker News
- JWT Authentication (Register/Login)
- Bookmark stories
- Protected Bookmarks page
- Pagination support

## Tech Stack
- MongoDB, Express, React, Node.js
- Cheerio (scraping)
- JWT (auth)
- Vite (frontend)

## Setup Instructions

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Environment Variables

### Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### Frontend (.env)
VITE_API_URL=http://localhost:5000/api

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Stories
- GET /api/stories
- GET /api/stories/:id
- POST /api/stories/:id/bookmark (auth required)

### Scraper
- POST /api/scrape