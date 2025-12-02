import { logger } from './core/logger.js';
import { StatsManager } from './core/StatsManager.js';
import { patch, unpatch } from './core/patcher.js';
import { CacheOptimizer } from './optimizers/CacheOptimizer.js';
import { ConcurrencyOptimizer } from './optimizers/ConcurrencyOptimizer.js';
import { MemoryOptimizer } from './optimizers/MemoryOptimizer.js';

class UltraModeScraper {
  constructor(options = {}) {
    this.optimizers = new Map();
    this.statsManager = new StatsManager();
    this.reportInterval = null;

    const { memoryLimit, maxConcurrency } = options;

    this.cache = new CacheOptimizer(this.statsManager);
    this.concurrency = new ConcurrencyOptimizer(maxConcurrency);
    this.memory = new MemoryOptimizer(this.cache, this.statsManager, memoryLimit);

    this.registerOptimizer('cache', this.cache);
    this.registerOptimizer('concurrency', this.concurrency);
    this.registerOptimizer('memory', this.memory);
  }

  initialize() {
    logger.logWelcomeMessage();
    this.memory.startMonitoring();
    patch(this.cache, this.concurrency);

    // Iniciar el informe periódico
    this.reportInterval = setInterval(() => {
      const stats = this.getStats();
      logger.logOptimizationReport(stats);
    }, 10 * 60 * 1000); // Cada 10 minutos
  }

  async destroy() {
    await this.concurrency.whenIdle();
    this.memory.stopMonitoring();
    unpatch();

    // Detener el informe periódico
    if (this.reportInterval) {
      clearInterval(this.reportInterval);
    }
  }

  registerOptimizer(name, optimizer) {
    this.optimizers.set(name, optimizer);
  }

  getStats() {
    return this.statsManager.getStats();
  }
}

export { UltraModeScraper };
