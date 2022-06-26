import { httpServer } from './http_server';
import commandsParser from './helpers/commandsParcer';
import { WebSocketServer, createWebSocketStream } from 'ws';

const HTTP_PORT = 8081;
const WS_PORT = 8080;
const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws) => {
	const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
	console.log('new client connected');
	ws.on('message', async (data) => {
		console.log(data.toString());
		const result = await commandsParser(data.toString());
		duplex.write(`${result} \0`);
	});
	ws.on('close', () => {
		clearInterval(interval);
		console.log('the client has disconnected');
	});
	ws.onerror = function () {
		console.log('Some Error occurred');
	};
});

const interval = setInterval(() => {
	wss.clients.forEach((ws: any) => {
		if (ws.isAlive === false) return ws.terminate();

		ws.isAlive = false;
		ws.ping();
	});
}, 30000);

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
