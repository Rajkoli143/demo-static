const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Store responses in a file
const RESPONSES_FILE = 'responses.json';

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
    await fs.writeFile(RESPONSES_FILE, JSON.stringify(responses, null, 2));
}

// Load responses when server starts
loadResponses();

// Endpoint to handle button clicks
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

// Endpoint to get all responses
app.get('/api/responses', (req, res) => {
    res.json(responses);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
