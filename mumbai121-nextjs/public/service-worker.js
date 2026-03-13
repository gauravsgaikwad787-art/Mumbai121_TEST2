const CACHE_NAME = 'mumbai121-v1' // ← bump to v2, v3 on every deploy

const STATIC_ASSETS = [
  '/',
  '/fresher',
  '/pwbd',
  '/company',
  '/volunteer',
  '/donor',
  '/about',
  '/faq',
  '/contact',
  '/download',
]

// Install — cache all pages
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate — delete OLD cache versions automatically
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('Deleting old cache:', key)
            return caches.delete(key)
          })
      )
    )
  )
  self.clients.claim()
})

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((response) => {
        // Cache new pages dynamically
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, response.clone())
          return response
        })
      })
    }).catch(() => caches.match('/'))
  )
})