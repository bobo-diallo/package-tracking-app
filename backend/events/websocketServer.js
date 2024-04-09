const WebSocket = require('ws');

const createWebSocketServer = (port) => {
    const wss = new WebSocket.Server({ port });

    wss.on('listening', () => {
        console.log(`WebSocket server is listening on port ${port}`);
    });

    wss.on('connection', (ws) => {
        console.log('New WebSocket client connected');

        ws.on('message', (message) => {
            console.log('Received message', message);
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
