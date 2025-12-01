import http from 'http';
import https from 'https';

const originalHttpRequest = http.request;
const originalHttpsRequest = https.request;

function patch(cache, concurrency) {
  function createPatchedRequest(originalRequest) {
    return function (options, callback) {
      if (options.method && options.method.toUpperCase() !== 'GET') {
        return originalRequest(options, callback);
      }

      const url = options.href || `${options.protocol || 'http:'}//${options.hostname || options.host}${options.path}`;
      const cachedResponse = cache.get(url);

      if (cachedResponse) {
        const fakeReq = new http.ClientRequest(options);
        const fakeRes = new http.IncomingMessage();
        fakeRes.push(cachedResponse);
        fakeRes.push(null);
        if (callback) callback(fakeRes);
        return fakeReq;
      }

      const task = () => new Promise((resolve) => {
        const req = originalRequest(options, (res) => {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => {
            const buffer = Buffer.concat(chunks);
            cache.set(url, buffer);
            resolve();
          });
          if (callback) callback(res);
        });
        req.end();
      });

      concurrency.addTask(task);
      return new http.ClientRequest(options);
    };
  }

  http.request = createPatchedRequest(originalHttpRequest);
  https.request = createPatchedRequest(originalHttpsRequest);
}

function unpatch() {
  http.request = originalHttpRequest;
  https.request = originalHttpsRequest;
}

export { patch, unpatch };
