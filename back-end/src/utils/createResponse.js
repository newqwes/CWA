/**
 * @description Returns the Object with status, message and data
 * @param {number} status - HTTP status code
 * @param {string} message - response message
 * @param {Object} data - response obj
 * @returns {Object}
 */
export default (status, message, data = {}) => ({ status, data: { data, message } });
