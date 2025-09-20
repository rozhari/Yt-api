// server.js
const express = require('express');

// Scraper import - make sure scraper.js same folder-ൽ ഉണ്ട്
const { ytd } = require('./scraper');

const app = express();

// JSON parsing middleware
app.use(express.json());

// ✅ YouTube Download Endpoint
app.get('/youtube', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'URL required' });

    // Call scraper
    const result = await ytd(url);

    if (!result || !result.url) {
      return res.status(500).json({ error: 'Download link not found' });
    }

    // Success
    res.json({
      title: result.title || 'YouTube Video',
      url: result.url
    });
  } catch (err) {
    console.error('YouTube download error:', err.message || err);
    res.status(500).json({ error: err.message || 'YouTube download failed' });
  }
});

// Dynamic PORT (Render assigns via environment variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 YouTube Downloader API running on port ${PORT}`));
