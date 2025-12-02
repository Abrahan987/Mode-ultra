const logger = {
  logWelcomeMessage: () => {
    console.log('SCRAPER BY ABRAHAN-M OPTIMIZAR TU BOT');
  },
  logOptimizationReport: (stats) => {
    console.log('--- Informe de Optimización ---');
    console.log(`Tasa de aciertos de caché: ${stats.cacheHitRate.toFixed(2)}%`);
    console.log(`Uso de memoria: ${stats.memoryUsage} MB`);
    console.log(`Limpiezas de caché por memoria: ${stats.cacheClears}`);
    console.log(`Peticiones fallidas evitadas: ${stats.avoidedRequests}`);
    console.log(`Peticiones exitosas: ${stats.successfulRequests}`);
    console.log(`Peticiones fallidas: ${stats.failedRequests}`);
    console.log(`Total de datos descargados: ${stats.totalDataDownloaded} KB`);
    console.log('---------------------------------');
  }
};

export { logger };
