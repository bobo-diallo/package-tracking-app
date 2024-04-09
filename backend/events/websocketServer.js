const WebSocket = require('ws');
const eventEmitter = require('./eventHandler');

/**
 * Create a WebSocket server
 * @param port
 * @returns {WebSocket.Server}
 */
const createWebSocketServer = (port) => {
    const wss = new WebSocket.Server({ port });

    wss.on('listening', () => {
        console.log(`WebSocket server is listening on port ${port}`);
    });

    wss.on('connection', (ws) => {
        console.log('New WebSocket client connected');

        /**
         * Handle incoming messages from WebSocket clients
         */
        ws.on('message', (message) => {
            console.log('Received message', message);

            const parsedMessage = JSON.parse(message);
            eventEmitter.emit(parsedMessage.event, parsedMessage.data);
        });

        ws.on('error', (error) => {
            console.error('Error websocket connection', error);
        });

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    });

    return wss;
};

module.exports = createWebSocketServer;
