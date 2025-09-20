// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // declare PORT once at the top

// Safe import of scraper.js
let scraper;
try {
  scraper = require(path.join(__dirname, 'scraper'));
  console.log('scraper module loaded successfully.');
} catch (err) {
  console.error('scraper module not found! Make sure scraper.js exists.');
  scraper = null;
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
