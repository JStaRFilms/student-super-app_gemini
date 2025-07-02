// Polyfill for the Response object in Node.js
if (typeof Response === 'undefined') {
  globalThis.Response = class Response {
    constructor(body, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || '';
      this.headers = new Headers(init.headers);
      this.ok = this.status >= 200 && this.status < 300;
    }

    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }

    async text() {
      return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
    }
  };
}

// Polyfill for the Headers object in Node.js
if (typeof Headers === 'undefined') {
  globalThis.Headers = class Headers {
    constructor(init) {
      this._headers = new Map();
      if (init) {
        Object.entries(init).forEach(([key, value]) => {
          this.set(key, value);
        });
      }
    }

    set(key, value) {
      this._headers.set(key.toLowerCase(), String(value));
    }

    get(key) {
      return this._headers.get(key.toLowerCase()) || null;
    }

    has(key) {
      return this._headers.has(key.toLowerCase());
    }
  };
}

// Polyfill for the Request object in Node.js
if (typeof Request === 'undefined') {
  globalThis.Request = class Request {
    constructor(input, init = {}) {
      this.url = input;
      this.method = init.method || 'GET';
      this.headers = new Headers(init.headers);
      this.body = init.body;
    }
  };
}
