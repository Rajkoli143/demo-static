const { db } = require('./firebase-config');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, buttonType, timestamp } = req.body;

    if (!name || !buttonType) {
      return res.status(400).json({ success: false, error: 'Name and button type are required' });
    }

    const response = { name, buttonType, timestamp: timestamp || new Date().toISOString() };

    try {
      await db.collection('responses').add(response);
      res.json({ success: true, data: response });
    } catch (error) {
      console.error('Error saving response:', error);
      res.status(500).json({ success: false, error: 'Failed to save response' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
