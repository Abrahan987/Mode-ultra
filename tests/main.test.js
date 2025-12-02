import test from 'node:test';
import assert from 'node:assert';
import { UltraModeScraper } from '../src/index.js';
import fetch from 'node-fetch';

test('Ultra Mode Scraper full lifecycle test', async (t) => {
  const scraper = new UltraModeScraper();
  scraper.initialize();

  const testUrl = 'https://jsonplaceholder.typicode.com/todos/4';

  await t.test('it should fetch a URL and cache the response, making the second request faster', async () => {
    // Cache Miss
    const startTimeMiss = Date.now();
    let response = await fetch(testUrl);
    const durationMiss = Date.now() - startTimeMiss;
    assert.strictEqual(response.ok, true, 'First response should be OK');

    // Cache Hit
    const startTimeHit = Date.now();
    response = await fetch(testUrl);
    const durationHit = Date.now() - startTimeHit;
    assert.strictEqual(response.ok, true, 'Second response should be OK');

    assert.ok(durationHit < durationMiss, 'Cached request should be significantly faster');
    assert.ok(durationHit < 50, 'Cached request should be very fast (e.g., < 50ms)');
  });

  await scraper.destroy();
});
