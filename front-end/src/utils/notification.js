import { notification } from 'antd';
import { head } from 'lodash';
import { compose, get } from 'lodash/fp';

import {
  NOTIFICATION_TYPE,
  NOTIFICATION_MESSAGE_PLACEMENT,
  NOTIFICATION_DURATION,
  NOTIFICATION_ERROR_MESSAGE,
} from '../constants/notification';

/**
 * @param {Object} data
 * @param {string} data.message
 * @param {string} data.type
 * @param {string} data.placement
 * @param {number} data.duration
 * @returns {void}
 */
export const getNotification = ({
  message = NOTIFICATION_ERROR_MESSAGE,
  type = NOTIFICATION_TYPE.error,
  placement = NOTIFICATION_MESSAGE_PLACEMENT.topRight,
  duration = NOTIFICATION_DURATION,
}) => {
  notification[type]({
    message,
    placement,
    duration,
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
