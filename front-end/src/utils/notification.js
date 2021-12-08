import { notification } from 'antd';
import { head } from 'lodash';
import { compose, get } from 'lodash/fp';

import { NOTIFICATION_TYPE, NOTIFICATION_MESSAGE_PLACEMENT } from '../constants/notification';

/**
 * @description This method causes a notification method from the AntD library
 * and transmits it to the message parameter, placement - message placement
 * @param {string} message - notification message
 * @param {string} type - Type of alert
 * @returns {void}
 */
export const getNotification = ({ message, type = NOTIFICATION_TYPE.error }) => {
  notification[type]({
    message,
    placement: NOTIFICATION_MESSAGE_PLACEMENT.topRight,
    duration: 1,
  });
};

/**
 * @description Calls the GetNotification method only for the first error field,
 * for its further output to the user screen
 * @param {[{errors: [string]}]} errorFields - All errors from the form
 * @returns {void}
 */
export const setNotificationForm = errorFields => {
  const message = compose(get('errors'), head)(errorFields);

  getNotification({ message, type: NOTIFICATION_TYPE.warning });
};
