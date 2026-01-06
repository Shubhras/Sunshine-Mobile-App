import moment from "moment"

const formatMessage = message => {
  const mime = message?.url?.mime || message?.mime
  if (mime) {
    if (mime.startsWith('video')) {
      return 'Someone sent a video.'
    } else if (mime.startsWith('audio')) {
      return 'Someone sent an audio.'
    } else if (mime.startsWith('image')) {
      return 'Someone sent a photo.'
    }
  }
  if (message?.content && message.content.length > 0) {
    return message?.content
  } else if (message && message.length > 0) {
    return message
  } else if (message) {
    return JSON.stringify(message)
  }
  return ''
}

const getMessageTime = (createdAt) => {
  const messageDate = moment(createdAt?.seconds * 1000 || new Date());

  if (moment().isSame(messageDate, 'day')) {
    return messageDate.format('hh:mm A');
  }

  if (moment().subtract(1, 'day').isSame(messageDate, 'day')) {
    return `Yesterday, ${messageDate.format('hh:mm A')}`;
  }

  return messageDate.format('DD MMM, hh:mm A');
};

  const timeFormat = timeStamp => {
    if (timeStamp) {
      if (moment(timeStamp).isValid()) {
        return moment.unix(timeStamp).fromNow();
      }
      if (moment().diff(moment.unix(timeStamp.seconds), 'days') == 0) {
        return moment.unix(timeStamp.seconds).format('H:mm');
      }
      return moment.unix(timeStamp.seconds).fromNow();
    }
    return ' ';
  };

export { formatMessage, getMessageTime,timeFormat }
