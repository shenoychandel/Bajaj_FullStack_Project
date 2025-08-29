const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Personal details - Replace with your actual details
const USER_DETAILS = {
    full_name: "shenoy_chandel", 
    birth_date: "30102003", 
    email: "shenoysingh109@gmail.com", 
    roll_number: "22BIT0299" 
};

// Helper function to check if a character is alphabetic
function isAlphabetic(char) {
    return /^[a-zA-Z]$/.test(char);
}

// Helper function to check if a character is numeric
function isNumeric(char) {
    return /^[0-9]+$/.test(char);
}

// Helper function to check if a character is special
function isSpecialCharacter(char) {
    return !isAlphabetic(char) && !isNumeric(char);
}

// Helper function to create alternating caps string
function createAlternatingCapsString(alphabets) {
    // Reverse the alphabets array and create alternating caps
    const reversed = [...alphabets].reverse();
    let result = '';
    
    for (let i = 0; i < reversed.length; i++) {
        if (i % 2 === 0) {
            result += reversed[i].toLowerCase();
        } else {
            result += reversed[i].toUpperCase();
        }
    }
    
    return result;
}

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Validate request body
        if (!req.body || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid request format. Expected 'data' array in request body."
            });
        }

        const inputData = req.body.data;
        
        // Initialize arrays and variables
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;

        // Process each item in the input data
        inputData.forEach(item => {
            const itemStr = String(item);
            
            if (isNumeric(itemStr)) {
                const num = parseInt(itemStr);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(itemStr);
                } else {
                    oddNumbers.push(itemStr);
                }
            } else if (isAlphabetic(itemStr) && itemStr.length === 1) {
                alphabets.push(itemStr.toUpperCase());
            } else if (itemStr.length === 1) {
                specialCharacters.push(itemStr);
            }
        });

        // Create concatenated string with alternating caps
        const concatString = createAlternatingCapsString(alphabets);

        // Prepare response
        const response = {
            is_success: true,
            user_id: `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`,
            email: USER_DETAILS.email,
            roll_number: USER_DETAILS.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET route for /bfhl (optional - for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "BFHL API is running",
        endpoints: {
            post: "/bfhl - Main API endpoint",
            get: "/bfhl - Get operation code"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});
