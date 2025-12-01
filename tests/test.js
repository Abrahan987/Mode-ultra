import test from 'node:test';
import assert from 'node:assert';
import { UltraModeScraper } from '../src/UltraModeScraper.js';

test('UltraModeScraper should initialize and destroy without errors', async () => {
  const scraper = new UltraModeScraper();
  assert.doesNotThrow(() => {
    scraper.initialize();
  }, 'Initialization should not throw an error');
  await scraper.destroy();
});
