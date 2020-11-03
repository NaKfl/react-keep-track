import { notification } from 'antd';

export function notifyError(message) {
  notification.error({
    message: message,
    placement: 'topRight',
    top: 90,
  });
}

export function notifySuccess(message) {
  notification.success({
    message: message,
    placement: 'topRight',
    top: 90,
  });
}
