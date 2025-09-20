// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Safe import of scraper.js
let scraper;
try {
  scraper = require(path.join(__dirname, 'scraper'));
  console.log('scraper module loaded successfully.');
} catch (err) {
  console.error('scraper module not found! Make sure scraper.js exists in the same folder as server.js.');
  scraper = null; // fallback if scraper is missing
}

// Example route
app.get('/', async (req, res) => {
  if (scraper) {
    try {
      const data = await scraper(); // assuming scraper exports a function returning a promise
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(500).send('Scraper module not available.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 YouTube Downloader API running on port ${PORT}`));
