# Ultra Mode Scraper 🚀

Un optimizador de alto rendimiento para scrapers en Node.js, diseñado para mejorar la latencia, optimizar el uso de memoria y aumentar la velocidad de tus bots.

## ✨ Características

*   **🚀 Optimización Automática (Solo GET)**: Intercepta automáticamente las solicitudes `http` y `https` con el método `GET` para aplicar optimizaciones sin necesidad de cambiar tu código.
*   **⚡ Sistema de Caché Inteligente**: Almacena en memoria las respuestas para reducir la latencia.
*   **🎯 Control de Concurrencia**: Gestiona una cola para controlar las operaciones simultáneas.
*   **💾 Optimización de Memoria**: Monitoriza el uso de memoria y limpia la caché automáticamente.
*   **📊 Informes de Rendimiento Periódicos**: Muestra en la consola métricas de rendimiento cada 10 minutos.

## 🚀 Instalación

```bash
npm install ultra-mode-scraper
```

## 📝 Uso Correcto

Para que el optimizador funcione, **debes instanciarlo e inicializarlo** al principio de tu aplicación.

```javascript
import { UltraModeScraper } from 'ultra-mode-scraper';
import fetch from 'node-fetch'; // O cualquier otra librería de peticiones

async function main() {
  // 1. Inicializar el scraper
  const scraper = new UltraModeScraper({
    memoryLimit: 256, // Límite de memoria en MB (opcional)
    maxConcurrency: 10, // Concurrencia máxima (opcional)
  });
  scraper.initialize();

  // 2. Realizar peticiones como lo harías normalmente
  console.log('Realizando primera petición (cache miss)...');
  await fetch('https://jsonplaceholder.typicode.com/todos/1');

  console.log('Realizando segunda petición (cache hit)...');
  await fetch('https://jsonplaceholder.typicode.com/todos/1');

  // 3. Destruir la instancia al final para limpiar
  await scraper.destroy();
}

main();
```
