// 🔄 Immediately activate new service worker
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// 📡 Take control of clients as soon as activated
self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

// 📩 Handle incoming push
self.addEventListener('push', function(event) {
  const data = (() => {
    try {
      return event.data.json();
    } catch {
      return {
        title: 'New Notification',
        body: 'You have a new message.',
        icon: '/bcs-logo.png',
        url: '/',
      };
    }
  })();

  const options = {
    body: data.body,
    icon: data.icon || '/bcs-logo.png',
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 📦 Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
