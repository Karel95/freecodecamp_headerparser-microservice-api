// index.js
require('dotenv').config();
var express = require('express');
var cors = require('cors');

var app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 })); // Corregido el typo

// Static files
app.use(express.static('public'));

// Root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint: /api/whoami
app.get("/api/whoami", function (req, res) {
  const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({ ipaddress, language, software });
});

// API test endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Listen on environment port or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
