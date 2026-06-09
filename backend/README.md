# Backend - Campus Marketplace

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Start server: `node server.js` (or `npm run dev` with nodemon)

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/listings  (auth required via x-auth-token header)
- GET /api/listings?lat=..&lng=..&radius=meters
- GET /api/listings/:id
