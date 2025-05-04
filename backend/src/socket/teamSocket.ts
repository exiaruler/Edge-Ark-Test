/*
import express from 'express';
import expressWs from 'express-ws';
import { WebSocket } from 'ws';

const router = express.Router() as expressWs.Router;

// @ts-ignore: Tell TypeScript we're extending the Router
(router as any).ws = (route: string, handler: any) => {
  // This is just a placeholder if not patched; see below for real fix
};

const items = ['apple', 'banana', 'carrot', 'date', 'fig'];

router.ws('/search', (ws: WebSocket, req: express.Request) => {
  ws.on('message', (msg: string) => {
    const query = msg.toString().toLowerCase();
    const matches = items.filter(i => i.startsWith(query));
    ws.send(JSON.stringify({ results: matches }));
  });
});

export default router;
*/
// src/wsRoutes.ts
import express, { Request } from 'express';
import { WebSocket } from 'ws';

const router = express.Router();

router.ws('/echo', (ws: WebSocket, req: Request) => {
  ws.on('message', (msg: string) => {
    console.log('Received:', msg);
    ws.send(`Echo: ${msg}`);
  });

  ws.send('WebSocket connection established.');
});

export default router;
