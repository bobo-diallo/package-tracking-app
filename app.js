const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const createWebSocketServer = require('./backend/events/websocketServer');
const eventEmitter = require('./backend/events/eventHandler');

const packageRoutes = require('./backend/routes/packageRoutes');
const deliveryRoutes = require('./backend/routes/deliveryRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/package-tracking-db';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/package', packageRoutes);
app.use('/api/delivery', deliveryRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        const wss = createWebSocketServer(WS_PORT);
        // Dispatch events to WebSocket clients
        eventEmitter.on('delivery_updated', (data) => {
            console.log('Delivery updated event received:', data);
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ event: 'delivery_updated', delivery: data }));
            });
        });
    })
    .catch(error => {
        console.log('Error connecting to database', error);
    });
