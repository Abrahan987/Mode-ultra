import test from 'node:test';
import assert from 'node:assert';
import http from 'http';
import { UltraModeScraper } from '../src/UltraModeScraper.js';

test('patcher integration test', async () => {
  const server = http.createServer((req, res) => {
    res.end('hello');
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  const scraper = new UltraModeScraper({ maxConcurrency: 1 });
  scraper.initialize();

  const makeRequest = () => new Promise((resolve) => {
    http.get(`http://localhost:${port}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
  });

  // Primera petición (cache miss)
  await makeRequest();
  assert.strictEqual(scraper.getStats().cacheHitRate, 0, 'Should be a cache miss on first request');

  // Segunda petición (cache hit)
  await makeRequest();
  assert.strictEqual(scraper.getStats().cacheHitRate.toFixed(2), '50.00', 'Should be a cache hit on second request');

  await scraper.destroy();
  await new Promise((resolve) => server.close(resolve));
});
