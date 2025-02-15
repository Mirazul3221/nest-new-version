export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notifications.");
      return;
    }
  
    if (Notification.permission === "granted") {
      console.log("Notification permission already granted.");
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      console.log(`Notification permission: ${permission}`);
    }
  };
  

 export const showNotification = (data) => {
    if (Notification.permission === "granted") {
      new Notification(`New Message From ${data.name}`, {
        body: data.message.content,
        icon: data.profile, // Optional: Add an icon
      });
    }
  };
  