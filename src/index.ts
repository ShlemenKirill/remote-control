import Jimp from 'jimp';
import { httpServer } from './http_server';
import commandsParser from './helpers/commandsParcer';
import { WebSocketServer } from 'ws';
import {IncomingMessage, ServerResponse} from "http";

const HTTP_PORT = 3000;
const WS_PORT = 8080;
const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws) => {
	console.log('new client connected');
	// sending message
	ws.on('message', (data) => {
		console.log(data.toString());
		commandsParser(data.toString());
	});
	// handling what to do when clients disconnects from server
	ws.on('close', () => {
		clearInterval(interval);
		console.log('the client has disconnected');
	});
	// handling client connection error
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
