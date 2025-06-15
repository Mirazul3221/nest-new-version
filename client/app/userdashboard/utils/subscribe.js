import { baseurl, PUBLIC_VAPID_PUBLIC_KEY } from "@/app/config";
import axios from "axios";

export async function subscribeUser(id) {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return;
    }

    try {
      // Wait until service worker is fully ready (active + controlling page)
      const registration = await navigator.serviceWorker.register("/worker.js");
      const readyRegistration = await navigator.serviceWorker.ready;

      const existingSubscription =
        await readyRegistration.pushManager.getSubscription();

      if (!existingSubscription) {
        const newSubscription = await readyRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY),
        });

        await axios.post(`https://edu-socket.onrender.com/save-subscription`, {
          key: newSubscription,
          userId: id,
        });
        console.log("New push subscription saved.");
      } else {
        console.log("User already subscribed to push.");
      }
    } catch (err) {
      console.error("Push subscription failed:", err);
    }
  }
}

// helper function//
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

/////
// import { PUBLIC_VAPID_PUBLIC_KEY } from "@/app/config";

// export async function subscribeUser() {
//   if ('serviceWorker' in navigator && 'PushManager' in window) {
//     const registration = await navigator.serviceWorker.register('/worker.js');

//     // Check for existing subscription
//     const existingSubscription = await registration.pushManager.getSubscription();

//     if (existingSubscription) {
//       // Optional: Send it to the backend if not saved before
//       console.log('Using existing subscription', existingSubscription);

//       try {
//         await fetch(`https://edu-socket.onrender.com/save-subscription`, {
//           method: 'POST',
//           body: JSON.stringify(existingSubscription),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//       } catch (error) {
//         console.error('Failed to send existing subscription:', error);
//       }

//       return existingSubscription;
//     }

//     // No existing subscription — create a new one
//     const subscription = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY),
//     });

//     console.log('New subscription', subscription);

//     try {
//       await fetch(`https://edu-socket.onrender.com/save-subscription`, {
//         method: 'POST',
//         body: JSON.stringify(subscription),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (error) {
//       console.error('Failed to send new subscription:', error);
//     }

//     return subscription;
//   }
// }

// // helper stays the same
// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = atob(base64);
//   return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
// }
