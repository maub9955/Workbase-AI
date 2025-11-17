declare module 'ws' {
  import { EventEmitter } from 'events';
  import * as http from 'http';
  import * as https from 'https';
  import * as net from 'net';

  export interface WebSocket extends EventEmitter {
    readonly readyState: number;
    readonly protocol: string;
    readonly url: string;
    send(data: any, cb?: (err?: Error) => void): void;
  }

  export interface ServerOptions {
    port?: number;
    host?: string;
    server?: http.Server | https.Server;
  }

  export class WebSocketServer extends EventEmitter {
    constructor(options?: ServerOptions, callback?: () => void);
    on(event: 'connection', listener: (socket: WebSocket) => void): this;
  }

  export const WebSocket: {
    new(address: string | http.ClientRequest, protocols?: string | string[], options?: any): WebSocket;
  };
}

