const express = require('express');
const { ytd } = require('./scraper');

const app = express();
app.use(express.json());

app.get('/youtube', async (req, res) => {
  try {
    if (!req.query.url) return res.status(400).json({ error: 'URL required' });
    const result = await ytd(req.query.url);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'YouTube download failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 YouTube Downloader API running on port ${PORT}`));
