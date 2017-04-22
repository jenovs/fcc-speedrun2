const path = require('path');
const express = require('express');
const app = express();

const quotes = require('./quotes.json');

app.use('/frontend/tribute-page', express.static(__dirname + '/../frontend/tribute-page/dist'))
app.use('/frontend/random-quote-machine', express.static(__dirname + '/../frontend/random-quote-machine/dist'))
app.use('/frontend/local-weather', express.static(__dirname + '/../frontend/local-weather/dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/wip/tribute-page', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/tribute-page/dist/index.html'));
});

app.get('/wip/random-quote-machine', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/random-quote-machine/dist/index.html'));
});

app.get('/wip/local-weather', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/local-weather/dist/index.html'));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/quote', (req, res) => {
  const rnd = Math.floor(Math.random() * quotes.length);
  res.send(quotes[rnd]);
});

app.listen(3014);
