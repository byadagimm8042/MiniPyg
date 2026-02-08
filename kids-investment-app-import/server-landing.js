const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page.html'));
});

app.listen(PORT, () => {
  console.log(`Landing page server running at:`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://YOUR_IP:${PORT}`);
});