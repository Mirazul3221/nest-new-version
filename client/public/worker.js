self.addEventListener('push', function(event) {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: req.user.profile?.replace('http://', 'https://') || '/bcs-logo.png', // fallback icon
    data: {
      url: data.url, // attach custom URL to open on click
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Open custom URL from push payload
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
