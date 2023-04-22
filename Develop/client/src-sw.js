const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'style' || request.destination === 'script', assetCache
);


// Define asset caching strategy
  // Create a CacheFirst strategy
  // Set cacheName to 'asset-cache'
  // Add plugins to the strategy
  // CacheableResponsePlugin with statuses [0, 200]
  // ExpirationPlugin with maxAgeSeconds (30 days)
// Register a route for asset caching
  // Define the criteria for the route
  // Request destination is 'image', 'style', or 'script'
  // Use the assetCache strategy for handling the matching requests