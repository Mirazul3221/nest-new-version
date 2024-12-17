import moment from "moment";

 export const formatRelativeTime = function (timestamp) {
    const now = moment(); // Current time
    const createdAt = moment(timestamp); // Parse the createdAt timestamp
    const duration = moment.duration(now.diff(createdAt)); // Calculate duration

    if (duration.asMinutes() < 1) {
      return `${Math.floor(duration.asSeconds())}s`; // Less than a minute, show in seconds
    } else if (duration.asHours() < 1) {
      return `${Math.floor(duration.asMinutes())}m`; // Less than an hour, show in minutes
    } else if (duration.asDays() < 1) {
      return `${Math.floor(duration.asHours())}h`; // Less than a day, show in hours
    } else {
      return `${Math.floor(duration.asDays())}d`; // More than a day, show in days
    }
  }