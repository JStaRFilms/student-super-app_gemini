// Type definitions for Node.js polyfills

declare global {
  // Add Response type if not already defined
  interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
  }

  // Add Headers type if not already defined
  interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
  }

  // Add Request type if not already defined
  interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: any;
  }

  // Declare global variables for Node.js
  var Response: {
    new (body?: any, init?: ResponseInit): Response;
    error(): Response;
    json(data: any, init?: ResponseInit): Response;
    redirect(url: string | URL, status?: number): Response;
  };

  var Headers: {
    new (init?: HeadersInit): Headers;
    prototype: Headers;
  };

  var Request: {
    new (input: string | URL, init?: RequestInit): Request;
    prototype: Request;
  };
}
