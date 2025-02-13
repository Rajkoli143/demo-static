const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// For Vercel, we'll store responses in /tmp directory
const RESPONSES_FILE = path.join('/tmp', 'responses.json');

// Initialize responses array
let responses = [];

// Load existing responses
async function loadResponses() {
    try {
        const data = await fs.readFile(RESPONSES_FILE, 'utf8');
        responses = JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, start with empty array
        responses = [];
    }
}

// Save responses to file
async function saveResponses() {
    try {
        await fs.writeFile(RESPONSES_FILE, JSON.stringify(responses, null, 2));
    } catch (error) {
        console.error('Error saving responses:', error);
    }
}

// Load responses when server starts
loadResponses();

// API Routes
app.post('/api/track-click', async (req, res) => {
    const { name, buttonType, timestamp } = req.body;
    
    if (!name || !buttonType) {
        return res.status(400).json({ 
            success: false, 
            error: 'Name and button type are required' 
        });
    }

    const response = {
        name,
        buttonType,
        timestamp: timestamp || new Date().toISOString()
    };

    responses.push(response);
    await saveResponses();
    
    res.json({ 
        success: true, 
        data: response 
    });
});

app.get('/api/responses', (req, res) => {
    res.json(responses);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'demo.html'));
});

// Serve dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'dashboard.html'));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the Express API for Vercel
module.exports = app;
