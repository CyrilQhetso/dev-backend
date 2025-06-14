# API Task

This is an Express.js backend that  accepts a string input, sorting its characters alphabetically, and returning the sorted array as JSON.

## Features

- POST `/api/sort-string`: Accepts JSON `{ "data": "example" }` and returns `{ "word": ["a", "e", "e", "l", "m", "p", "x"] }`
- GET `/api/health`: Health check endpoint
- CORS enabled
- Deployable via [Vercel](https://vercel.com)
