import { UltraModeScraper } from './UltraModeScraper.js';
import { logger } from './core/logger.js';

const scraper = new UltraModeScraper({
  memoryLimit: 128,
  maxConcurrency: 5,
});
scraper.initialize();

setInterval(() => {
  const stats = scraper.getStats();
  logger.logOptimizationReport(stats);
}, 10 * 60 * 1000); // Cada 10 minutos
