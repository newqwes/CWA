import { isArray, get } from 'lodash';

/**
 * @description Returns the extracted object
 * @param {Object} data - received data from the table using Sequelize
 * @returns {Object}
 */
export const extractDataFromResponseDB = data => {
  if (isArray(data)) {
    const dataValues = get(data, [1, 'dataValues']);

    return dataValues;
  }

  const { dataValues } = data;

  if (dataValues) return dataValues;

  return data;
};
