import { round } from 'lodash';

export const toNormalNumber = value => {
  if (!value) return 0;

  let normalNumber = Number(value);

  if (Math.abs(normalNumber) > 100) {
    normalNumber = round(normalNumber, 0);
    normalNumber = normalNumber.toFixed(0);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 1) {
    normalNumber = round(normalNumber, 2);
    normalNumber = normalNumber.toFixed(2);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.01) {
    normalNumber = round(normalNumber, 3);
    normalNumber = normalNumber.toFixed(3);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.001) {
    normalNumber = round(normalNumber, 4);
    normalNumber = normalNumber.toFixed(4);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.0001) {
    normalNumber = round(normalNumber, 5);
    normalNumber = normalNumber.toFixed(5);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.00001) {
    normalNumber = round(normalNumber, 6);
    normalNumber = normalNumber.toFixed(6);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.000001) {
    normalNumber = round(normalNumber, 7);
    normalNumber = normalNumber.toFixed(7);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.0000001) {
    normalNumber = round(normalNumber, 8);
    normalNumber = normalNumber.toFixed(8);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.00000001) {
    normalNumber = round(normalNumber, 9);
    normalNumber = normalNumber.toFixed(9);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.000000001) {
    normalNumber = round(normalNumber, 10);
    normalNumber = normalNumber.toFixed(10);

    return normalNumber;
  }

  if (Math.abs(normalNumber) > 0.0000000001) {
    normalNumber = round(normalNumber, 11);
    normalNumber = normalNumber.toFixed(11);

    return normalNumber;
  }

  return 0;
};
