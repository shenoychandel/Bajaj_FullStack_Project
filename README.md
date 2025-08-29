# BFHL Backend (Node + Express)

- Route: `POST /bfhl`
- Status code: always 200 with `is_success` true/false as per spec.
- Env-configured user details; copy `.env.example` -> `.env` and edit.

## Local run
```bash
cd backend
npm install
cp .env.example .env   # edit values
npm start
# POST http://localhost:3000/bfhl with JSON: { "data": ["a","1","334","4","R","$"] }
```

## Deploy on Railway/Render/Vercel
- Set environment variables `FULL_NAME`, `DOB_DDMMYYYY`, `EMAIL`, `ROLL_NUMBER`.
- Expose port `3000` (or as the platform dictates).

## Docker
```bash
docker build -t bfhl-backend .
docker run -p 3000:3000 --env-file .env bfhl-backend
```
