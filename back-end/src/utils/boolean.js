import { every, some, complement } from 'lodash/fp';

export const negate = complement(Boolean);

// someFalsey(['d', 'ds', '']) // true
export const everyTruthy = every(Boolean);
export const someTruthy = some(Boolean);

export const everyFalsey = every(negate);
export const someFalsey = some(negate);
