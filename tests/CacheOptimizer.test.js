import test from 'node:test';
import assert from 'node:assert';
import { CacheOptimizer } from '../src/optimizers/CacheOptimizer.js';
import { StatsManager } from '../src/core/StatsManager.js';

test('CacheOptimizer', () => {
  const statsManager = new StatsManager();
  const cache = new CacheOptimizer(statsManager);

  cache.set('key', 'value');
  assert.strictEqual(cache.get('key'), 'value', 'Should get the value from cache');
  assert.strictEqual(statsManager.getStats().cacheHitRate, 100, 'Should have 100% cache hit rate');

  cache.get('non-existent-key');
  assert.strictEqual(statsManager.getStats().cacheHitRate.toFixed(2), '50.00', 'Should have 50% cache hit rate');

  cache.clear();
  assert.strictEqual(cache.get('key'), undefined, 'Should be empty after clear');
});
