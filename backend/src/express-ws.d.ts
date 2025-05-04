import * as express from 'express';
import { WebSocket } from 'ws';

declare module 'express-serve-static-core' {
  interface Application {
    ws: (path: string, handler: (ws: WebSocket, req: express.Request) => void) => void;
  }

  interface Router {
    ws: (path: string, handler: (ws: WebSocket, req: express.Request) => void) => void;
  }
}