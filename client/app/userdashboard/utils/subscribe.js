import { baseurl, PUBLIC_VAPID_PUBLIC_KEY } from "@/app/config";

export async function subscribeUser() {
    const token = localStorage.getItem('token')
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const registration = await navigator.serviceWorker.register('/worker.js');

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY),
    });

    // Send this subscription to your backend
    
await fetch(`${baseurl}/save-subscription`, {
  method: 'POST',
  body: JSON.stringify(subscription),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})
  }
}

// helper function//
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
