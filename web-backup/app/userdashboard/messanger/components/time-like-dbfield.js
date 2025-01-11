export const  generateMongoDBStyleTimestamp = ()=> {
    const now = new Date();
    
    // Get ISO string (without time zone offset)
    const isoString = now.toISOString();  // This gives: "2024-11-11T11:21:13.817Z"
    
    // Replace "Z" with the desired time zone offset (e.g., +00:00 for UTC)
    const timezoneOffset = now.getTimezoneOffset();
    const offsetSign = timezoneOffset > 0 ? "-" : "+";
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, "0");
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");
  
    // Format the timestamp with the timezone offset
    const formattedTimestamp = isoString.replace("Z", `${offsetSign}${offsetHours}:${offsetMinutes}`);
  
    return formattedTimestamp;
  }