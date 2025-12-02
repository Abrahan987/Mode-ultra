class CacheOptimizer {
  constructor(statsManager) {
    this.cache = new Map();
    this.statsManager = statsManager;
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  get(key) {
    const value = this.cache.get(key);
    if (value) {
      this.statsManager.incrementCacheHits();
    } else {
      this.statsManager.incrementCacheMisses();
    }
    return value;
  }

  clear() {
    this.cache.clear();
  }
}

export { CacheOptimizer };
