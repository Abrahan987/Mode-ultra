import http from 'http';
import https from 'https';
import { PassThrough } from 'stream';

const originalHttpRequest = http.request;
const originalHttpsRequest = https.request;

function createPatcher(originalRequestMethod, protocol) {
  return function (options, callback) {
    if (options.method && options.method.toUpperCase() !== 'GET') {
      return originalRequestMethod(options, callback);
    }

    const url = options.href || `${protocol}://${options.hostname || options.host}${options.path}`;
    const req = new PassThrough();
    req.setTimeout = () => {};

    const cachedResponse = this.cache.get(url);
    if (cachedResponse) {
      const mockRes = new PassThrough();
      mockRes.statusCode = 200;
      mockRes.headers = {};

      process.nextTick(() => {
        req.emit('response', mockRes);
        if (typeof callback === 'function') callback(mockRes);
        mockRes.write(cachedResponse);
        mockRes.end();
      });
      return req;
    }

    const task = () => new Promise((resolve, reject) => {
      const realReq = originalRequestMethod(options, (res) => {
        const clientResponse = new PassThrough();
        Object.assign(clientResponse, { statusCode: res.statusCode, headers: res.headers });

        req.emit('response', clientResponse);
        if (typeof callback === 'function') callback(clientResponse);

        const chunks = [];
        res.on('data', (chunk) => {
          clientResponse.write(chunk);
          chunks.push(chunk);
        });
        res.on('end', () => {
          clientResponse.end();
          this.cache.set(url, Buffer.concat(chunks));
          resolve();
        });
        res.on('error', (err) => {
          clientResponse.emit('error', err);
          reject(err); // Corregido: Rechazar en caso de error
        });
      });

      realReq.on('error', (err) => {
        req.emit('error', err);
        reject(err); // Corregido: Rechazar en caso de error
      });
      req.pipe(realReq);
    });

    this.concurrency.addTask(task);
    return req;
  };
}

function patch(cache, concurrency) {
  const context = { cache, concurrency };
  http.request = createPatcher(originalHttpRequest, 'http').bind(context);
  https.request = createPatcher(originalHttpsRequest, 'https').bind(context);
}

function unpatch() {
  http.request = originalHttpRequest;
  https.request = originalHttpsRequest;
}

export { patch, unpatch };
