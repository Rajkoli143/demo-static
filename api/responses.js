const { db } = require('./firebase-config');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const snapshot = await db.collection('responses').orderBy('timestamp', 'desc').get();
      const responses = snapshot.docs.map(doc => doc.data());
      res.json(responses);
    } catch (error) {
      console.error('Error retrieving responses:', error);
      res.status(500).json({ success: false, error: 'Failed to retrieve responses' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
