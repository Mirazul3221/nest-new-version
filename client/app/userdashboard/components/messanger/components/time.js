import moment from "moment";

export  const formatetime = (timeStamp) => {
    const today = moment().startOf('day');
    const messageData = moment(timeStamp);
    const weekAgo = moment().subtract(1,'weeks').startOf('day');
    if (messageData.isSame(today,'day')) {
     return `${messageData.format('h:mm A')}`;
    }else if (messageData.isSame(today.subtract(1,'days'),'day')) {
      return `Yesterday at ${messageData.format('h:mm A')}`;
    }else if (messageData.isAfter(weekAgo)) {
     return `${messageData.format('dddd')} at ${messageData.format('h:mm A')}`;
    }else {
     return `${messageData.format('MMM D')} at ${messageData.format('h:mm A')}`
    }
 }