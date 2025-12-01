class StatsManager {
  constructor() {
    this.stats = {
      cacheHits: 0,
      cacheMisses: 0,
      memoryUsage: 0,
      cacheClears: 0
    };
  }

  incrementCacheHits() {
    this.stats.cacheHits++;
  }

  incrementCacheMisses() {
    this.stats.cacheMisses++;
  }

  incrementCacheClears() {
    this.stats.cacheClears++;
  }

  updateMemoryUsage() {
    this.stats.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // in MB
  }

  getStats() {
    this.updateMemoryUsage();
    return {
      cacheHitRate: this.stats.cacheHits + this.stats.cacheMisses > 0 ? (this.stats.cacheHits / (this.stats.cacheHits + this.stats.cacheMisses)) * 100 : 0,
      memoryUsage: this.stats.memoryUsage.toFixed(2),
      cacheClears: this.stats.cacheClears
    };
  }
}

export { StatsManager };
