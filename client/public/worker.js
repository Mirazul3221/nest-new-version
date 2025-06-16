// 🔄 Activate new service worker immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 📩 Handle incoming push notifications
self.addEventListener('push', (event) => {
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
    badge: data.badge || '/bcs-badge.png', // small monochrome badge (optional)
    data: {
      url: data.url || '/',
    },
    vibrate: [200, 100, 200], // for mobile visibility (optional)
    requireInteraction: true, // keeps it on screen until user interacts (optional)
    tag: 'bcs-notification', // to prevent stacking identical messages
    renotify: true // re-alerts if tag is reused
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 🖱️ Handle click on notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
