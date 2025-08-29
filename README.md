# BFHL REST API

A REST API built with Node.js and Express.js that processes arrays and returns categorized data.

 Features

- Processes input arrays to categorize different types of data
- Separates odd/even numbers, alphabets, and special characters
- Calculates sum of all numbers
- Creates concatenated string with alternating caps in reverse order
- Proper error handling and validation
- CORS enabled for cross-origin requests

 API Endpoints

POST /bfhl
Main endpoint that processes the input data.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

GET /bfhl
Returns operation code for testing purposes.

**Response:**
```json
{
  "operation_code": 1
}
```

Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd bfhl-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update personal details:
   Edit the `USER_DETAILS` object in `server.js` with your actual information:
   ```javascript
   const USER_DETAILS = {
       full_name: "your_name", // lowercase with underscores
       birth_date: "ddmmyyyy", // your birth date
       email: "your@email.com",
       roll_number: "YOUR123"
   };
   ```

4. Run locally:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

Deployment

 Vercel (Recommended)

1. Install Vercel CLI: 
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

Railway

1. Connect your GitHub repository to Railway
2. Deploy directly from the Railway dashboard

Render

1. Connect your GitHub repository to Render
2. Use the following settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

Testing

You can test the API using tools like Postman, cURL, or any HTTP client.

Example cURL command:
```bash
curl -X POST https://your-api-url.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

Logic Explanation

1. Input Validation:** Checks if the request contains a valid 'data' array
2. Data Processing:
   - Numbers are separated into odd/even arrays
   - Alphabets are converted to uppercase
   - Special characters are collected separately
   - Sum of all numbers is calculated
3. String Concatenation:
   - Alphabets are reversed
   - Alternating caps are applied (lowercase for even indices, uppercase for odd)
4. Response Formation: All processed data is returned with success status

