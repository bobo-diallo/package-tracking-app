const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Request received');
  next();
});


app.use((req, res, next) => {
  res.status(200);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Your request has been received' });
});

app.use((req, res, next) => {
  console.log('Response sent successfully');
});

module.exports = app;
