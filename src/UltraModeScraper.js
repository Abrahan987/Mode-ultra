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

    const { memoryLimit, maxConcurrency } = options;

    // Inicializar optimizadores
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
  }

  async destroy() {
    await this.concurrency.whenIdle();
    this.memory.stopMonitoring();
    unpatch();
  }

  registerOptimizer(name, optimizer) {
    this.optimizers.set(name, optimizer);
  }

  getStats() {
    return this.statsManager.getStats();
  }
}

export { UltraModeScraper };
