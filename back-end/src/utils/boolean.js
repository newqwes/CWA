import { every, some, complement } from 'lodash/fp';

export const negate = complement(Boolean);

/**
 * @example
 * // returns true
 * everyTruthy(['d', 'ds', '']);
 * @returns {Boolean}
 */
export const everyTruthy = every(Boolean);
export const someTruthy = some(Boolean);

export const everyFalsey = every(negate);
export const someFalsey = some(negate);
