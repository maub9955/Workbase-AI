declare module 'ws' {
  import { EventEmitter } from 'events';
  import * as http from 'http';
  import * as https from 'https';
  import * as net from 'net';

  export interface WebSocket extends EventEmitter {
    readonly readyState: number;
    readonly protocol: string;
    readonly url: string;
    readonly extensions: string;
    readonly binaryType: 'nodebuffer' | 'arraybuffer' | 'fragments';
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;

    close(code?: number, data?: string | Buffer): void;
    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    send(data: any, cb?: (err?: Error) => void): void;
    send(data: any, options: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean }, cb?: (err?: Error) => void): void;
    terminate(): void;
  }

  export interface ServerOptions {
    host?: string;
    port?: number;
    backlog?: number;
    server?: http.Server | https.Server;
    verifyClient?: (info: { origin: string; secure: boolean; req: http.IncomingMessage }) => boolean;
    handleProtocols?: (protocols: string[], request: http.IncomingMessage) => string | false;
    path?: string;
    noServer?: boolean;
    clientTracking?: boolean;
    perMessageDeflate?: boolean | any;
    maxPayload?: number;
  }

  export class WebSocketServer extends EventEmitter {
    constructor(options?: ServerOptions, callback?: () => void);
    clients: Set<WebSocket>;
    close(cb?: (err?: Error) => void): void;
    handleUpgrade(request: http.IncomingMessage, socket: net.Socket, upgradeHead: Buffer, callback: (client: WebSocket, request: http.IncomingMessage) => void): void;
    shouldHandle(request: http.IncomingMessage): boolean | Promise<boolean>;
  }

  export const WebSocket: {
    new(address: string | http.ClientRequest, protocols?: string | string[], options?: any): WebSocket;
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;
  };
}

