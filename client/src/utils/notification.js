const { notification, message } = require('antd');

/**
 * @param {'BANNER' | 'MESSAGE'} display
 * @param {'info' | 'error' | 'warning'} type
 * @param {string} msg
 * @param {string} [description]
 */
export function openNotification(display, type, msg, description) {
  if (display === 'BANNER') {
    notification.open({
      type,
      message: msg,
      description,
      placement: 'bottomRight',
    });
  } else if (display === 'MESSAGE') {
    message[type](msg);
  }
}
