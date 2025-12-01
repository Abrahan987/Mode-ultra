const logger = {
  logWelcomeMessage: () => {
    console.log('SCRAPER BY ABRAHAN-M OPTIMIZAR TU BOT');
  },
  logOptimizationReport: (stats) => {
    console.log('--- Informe de Optimización ---');
    console.log(`Tasa de aciertos de caché: ${stats.cacheHitRate.toFixed(2)}%`);
    console.log(`Uso de memoria: ${stats.memoryUsage} MB`);
    console.log(`Limpiezas de caché por memoria: ${stats.cacheClears}`);
    console.log('---------------------------------');
  }
};

export { logger };
