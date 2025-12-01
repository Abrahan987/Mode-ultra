class MemoryOptimizer {
  constructor(cacheOptimizer, statsManager, memoryLimit = 128) {
    this.cacheOptimizer = cacheOptimizer;
    this.statsManager = statsManager;
    this.memoryLimit = memoryLimit;
    this.monitoring = false;
    this.intervalId = null;
  }

  startMonitoring() {
    this.monitoring = true;
    this.intervalId = setInterval(() => {
      if (!this.monitoring) return;
      const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // in MB
      if (memoryUsage > this.memoryLimit) {
        this.cacheOptimizer.clear();
        this.statsManager.incrementCacheClears();
        console.log('Memory usage exceeded limit, cache cleared.');
      }
    }, 10000);
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.monitoring = false;
  }
}

export { MemoryOptimizer };
