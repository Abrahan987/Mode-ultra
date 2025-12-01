# Ultra Mode Scraper 🚀

Un optimizador de alto rendimiento para scrapers en Node.js, diseñado para mejorar la latencia, optimizar el uso de memoria y aumentar la velocidad de tus bots.

## ✨ Características

*   **🚀 Optimización Automática (Solo GET)**: Intercepta automáticamente las solicitudes `http` y `https` con el método `GET` para aplicar optimizaciones sin necesidad de cambiar tu código. Las solicitudes con otros métodos (POST, PUT, etc.) no se verán afectadas.
*   **⚡ Sistema de Caché Inteligente**: Almacena en memoria las respuestas de las peticiones para reducir la latencia y evitar solicitudes repetidas.
*   **🎯 Control de Concurrencia**: Gestiona una cola de tareas para controlar el número de operaciones simultáneas, optimizando el uso de la CPU y la red.
*   **💾 Optimización de Memoria**: Monitoriza el uso de memoria y limpia la caché automáticamente para prevenir fugas de memoria y asegurar un bajo consumo.
*   **📊 Informes de Rendimiento Reales**: Muestra en la consola métricas reales sobre la tasa de aciertos de la caché, el uso de memoria y el número de limpiezas de caché.

## 🚀 Instalación

```bash
npm install ultra-mode-scraper
```

## 📝 Uso

Simplemente importa la librería en tu proyecto. "Ultra Mode Scraper" se activará automáticamente y empezará a optimizar tu bot en segundo plano.

```javascript
import 'ultra-mode-scraper';

// Tu código de scraping aquí
```

### Configuración (Opcional)

Puedes pasar un objeto de configuración al constructor de `UltraMode Scraper` para personalizar su comportamiento.

```javascript
import { UltraModeScraper } from 'ultra-mode-scraper';

const scraper = new UltraModeScraper({
  memoryLimit: 256, // Límite de memoria en MB para la limpieza de caché (por defecto: 128)
  maxConcurrency: 10, // Número máximo de solicitudes simultáneas (por defecto: 5)
});

scraper.initialize();
```
