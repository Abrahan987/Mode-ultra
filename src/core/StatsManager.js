class StatsManager {
  constructor() {
    this.stats = {
      cacheHits: 0,
      cacheMisses: 0,
      memoryUsage: 0,
      cacheClears: 0,
      avoidedRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalDataDownloaded: 0, // en bytes
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

  recordAvoidedRequest() {
    this.stats.avoidedRequests++;
  }

  recordSuccessfulRequest(dataLength) {
    this.stats.successfulRequests++;
    this.stats.totalDataDownloaded += dataLength;
  }

  recordFailedRequest() {
    this.stats.failedRequests++;
  }

  updateMemoryUsage() {
    this.stats.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // en MB
  }

  getStats() {
    this.updateMemoryUsage();
    return {
      cacheHitRate: this.stats.cacheHits + this.stats.cacheMisses > 0 ? (this.stats.cacheHits / (this.stats.cacheHits + this.stats.cacheMisses)) * 100 : 0,
      memoryUsage: this.stats.memoryUsage.toFixed(2),
      cacheClears: this.stats.cacheClears,
      avoidedRequests: this.stats.avoidedRequests,
      successfulRequests: this.stats.successfulRequests,
      failedRequests: this.stats.failedRequests,
      totalDataDownloaded: (this.stats.totalDataDownloaded / 1024).toFixed(2), // en KB
    };
  }
}

export { StatsManager };
