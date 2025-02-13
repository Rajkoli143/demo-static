const fs = require('fs').promises;
const path = require('path');

// For Vercel, we'll store responses in /tmp directory
const RESPONSES_FILE = path.join('/tmp', 'responses.json');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const data = await fs.readFile(RESPONSES_FILE, 'utf8');
            const responses = JSON.parse(data);
            res.json(responses);
        } catch (error) {
            // If file doesn't exist, return empty array
            res.json([]);
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
