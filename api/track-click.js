const fs = require('fs').promises;
const path = require('path');

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

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        await loadResponses();
        
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
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
