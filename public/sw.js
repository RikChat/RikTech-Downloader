// Basic empty service worker (placeholder). For advanced caching, replace with Workbox or custom logic.
self.addEventListener('install', function(event){
  self.skipWaiting();
});
self.addEventListener('activate', function(event){
  self.clients.claim();
});
