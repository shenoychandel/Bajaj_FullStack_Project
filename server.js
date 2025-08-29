import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

// Helpers
const isIntegerString = (s) => /^-?\d+$/.test(s);
const isAlphaString = (s) => /^[A-Za-z]+$/.test(s);

function buildUserId() {
  const fullName = (process.env.FULL_NAME || 'john_doe').toLowerCase().replace(/\s+/g,'_');
  const dob = process.env.DOB_DDMMYYYY || '17091999';
  return `${fullName}_${dob}`;
}

function analyzeData(arr) {
  const result = {
    is_success: true,
    user_id: buildUserId(),
    email: process.env.EMAIL || 'john@xyz.com',
    roll_number: process.env.ROLL_NUMBER || 'ABCD123',
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: "0",
    concat_string: ""
  };

  let sum = 0;
  const letters = []; // collect per-character letters across all alpha tokens

  for (const raw of arr) {
    const item = String(raw);

    if (isAlphaString(item)) {
      result.alphabets.push(item.toUpperCase());
      // push each character for concat_string logic
      for (const ch of item) letters.push(ch);
    } else if (isIntegerString(item)) {
      // keep numbers as strings in outputs
      if (Math.abs(parseInt(item, 10)) % 2 === 0) {
        result.even_numbers.push(item);
      } else {
        result.odd_numbers.push(item);
      }
      sum += parseInt(item, 10);
    } else {
      result.special_characters.push(item);
      // also collect letters contained in mixed strings (if any)
      for (const ch of item) {
        if (/[A-Za-z]/.test(ch)) letters.push(ch);
      }
    }
  }

  // Sum as string
  result.sum = String(sum);

  // Concat string: reverse letters, alternating caps starting Upper then lower...
  const reversed = letters.reverse().join('');
  let alt = '';
  for (let i = 0; i < reversed.length; i++) {
    const ch = reversed[i];
    if (/[A-Za-z]/.test(ch)) {
      alt += (i % 2 === 0) ? ch.toUpperCase() : ch.toLowerCase();
    } else {
      alt += ch;
    }
  }
  result.concat_string = alt;

  return result;
}

// Health route (optional)
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Per spec: POST /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: buildUserId(),
        email: process.env.EMAIL || 'john@xyz.com',
        roll_number: process.env.ROLL_NUMBER || 'ABCD123',
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Invalid payload: 'data' must be an array of strings."
      });
    }
    const result = analyzeData(data.map(String));
    return res.status(200).json(result);
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: buildUserId(),
      email: process.env.EMAIL || 'john@xyz.com',
      roll_number: process.env.ROLL_NUMBER || 'ABCD123',
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: 'Server error: ' + err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
