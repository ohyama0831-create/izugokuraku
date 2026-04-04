// Service Worker - キャッシュを使わない設定
self.addEventListener('install', function(e){
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e){
  // キャッシュを一切使わずネットワークから取得
  e.respondWith(fetch(e.request, {cache: 'no-store'}));
});
