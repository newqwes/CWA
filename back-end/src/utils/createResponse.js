/**
 * @description Returns the Object with status, message and data
 * @param {number} status - HTTP status code
 * @param {string} message - response message
 * @param {Object} data - response obj
 * @returns {Object}
 */
export default (status, message, data = {}) => ({ status, data: { data, message } });

// TODO PROD
// export const makeAvatarURL = imgName => imgName &&
//   `${process.env.CLIENT_URL}/${process.env.PUBLIC_FOLDER_NAME}/${process.env.AVATAR_FOLDER}/${imgName}`;

// TODO LOCAL
export const makeAvatarURL = imgName => imgName &&
  `https://coinlitics.space/${process.env.PUBLIC_FOLDER_NAME}/${process.env.AVATAR_FOLDER}/${imgName}`;
