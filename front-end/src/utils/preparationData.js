import { get } from 'lodash/fp';

/**
 * @description Returns respons data
 * @param {Object} respons - respons from server
 * @returns {Object|undefined} - extracts data from the respons
 */
export const extractResponsData = get(['data', 'data']);
