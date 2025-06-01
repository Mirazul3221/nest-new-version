import { PUBLIC_VAPID_PUBLIC_KEY } from "@/app/config";

export async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const registration = await navigator.serviceWorker.register('/worker.js');

    // Check for existing subscription
    const existingSubscription = await registration.pushManager.getSubscription();

    if (existingSubscription) {
      // Unsubscribe the existing subscription to avoid InvalidStateError
      await existingSubscription.unsubscribe();
    }

    // Now subscribe with the correct VAPID key
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY),
    });
    console.log(subscription)
    console.log('dsisg nsknsghdg s gsdgnsd gdjhg fFrom subscription')
    // Send this subscription to your backend
    try {
          await fetch(`https://edu-socket.onrender.com/save-subscription`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    } catch (error) {
      
    }

    return subscription; // optionally return subscription
  }
}

// helper function stays the same
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
