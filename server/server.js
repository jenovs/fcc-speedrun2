const path = require('path');
const express = require('express');
const app = express();

app.use('../frontend/tribute-page', express.static(__dirname + '../frontend/tribute-page/dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/wip/tribute-page', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/tribute-page/dist/index.html'));
});

app.get('/api/quote', (req, res) => {
  res.send({quote: 'random quote'});
});

app.listen(3014);
