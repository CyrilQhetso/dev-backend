const express =  require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Task endpoint Main
app.post('/api/sort-string', (req, res) => {
    try {
        // Extract the data field from the request body
        const { data } = req.body;

        // Input validation
        if (!data || typeof data !== 'string') {
            return res.status(400).json({
                error: 'Invalid input. Expected a string in the "data" field.'
            });
        }

        // Convert string to array of characters
        const charArray = data.split('');
        
        // Sort the array alphabetically
        const sortedArray = charArray.sort();

        // Return the sorted array as requested
        return res.json({
            word: sortedArray
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error. Try again'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API server is running'
    });
});

// Local dev testing
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;