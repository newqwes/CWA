import { round } from 'lodash';

export const toNormalNumber = value => {
  if (!value) return 0;

  let normalNumber = value;

  if (Math.abs(normalNumber) > 0) {
    normalNumber = round(normalNumber, 2);
    normalNumber = normalNumber.toFixed(2);
  }

  if (Math.abs(normalNumber) > 100) {
    normalNumber = round(normalNumber, 1);
    normalNumber = normalNumber.toFixed(1);
  }

  if (Math.abs(normalNumber) > 1000) {
    normalNumber = round(normalNumber, 0);
    normalNumber = normalNumber.toFixed(0);
  }

  if (Math.abs(normalNumber) < 0.01) {
    normalNumber = round(normalNumber, 4);
    normalNumber = normalNumber.toFixed(4);
  }

  if (Math.abs(normalNumber) < 0.0001) {
    normalNumber = round(normalNumber, 6);
    normalNumber = normalNumber.toFixed(6);
  }

  if (Math.abs(normalNumber) < 0.000001) {
    normalNumber = round(normalNumber, 8);
    normalNumber = normalNumber.toFixed(8);
  }

  if (Math.abs(normalNumber) < 0.0000001) {
    normalNumber = round(normalNumber, 9);
    normalNumber = normalNumber.toFixed(9);
  }

  if (Math.abs(normalNumber) < 0.00000001) {
    normalNumber = round(normalNumber, 10);
    normalNumber = normalNumber.toFixed(10);
  }

  if (Math.abs(normalNumber) < 0.000000001) {
    normalNumber = 0;
  }
  return normalNumber;
};
