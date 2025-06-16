import { baseurl, PUBLIC_VAPID_PUBLIC_KEY } from "@/app/config";
import axios from "axios";

export async function subscribeUser(userId) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push messaging is not supported.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission denied");
    return;
  }

  try {
    // Register and wait until ready
    await navigator.serviceWorker.register("/worker.js");
    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    // ✅ Check if subscription exists AND is still valid
    if (!subscription || subscription.expirationTime < Date.now()) {
      // Unsubscribe old (just in case it's corrupt)
      if (subscription) {
        await subscription.unsubscribe();
        console.log("Old subscription unsubscribed");
      }

      // 📥 Subscribe again
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY),
      });

      console.log("New subscription created");
    } else {
      console.log("Existing push subscription is valid");
    }

    // ✅ Always send the (new or existing) subscription to backend
    await axios.post(`https://edu-socket.onrender.com/save-subscription`, {
      key: subscription,
      userId,
    });
    console.log("Push subscription saved to server");
  } catch (err) {
    console.error("Push subscription error:", err);
  }
}

// Base64 conversion for VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
