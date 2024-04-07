const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const packageRoutes = require('./backend/routes/packageRoutes');
const deliveryRoutes = require('./backend/routes/deliveryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/package-tracking-db';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/package', packageRoutes);
app.use('/api/delivery', deliveryRoutes);


mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to database');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      })
    })
    .catch(error => {
      console.log('Error connecting to database', error);
    });
