import { round } from 'lodash';

export const toMinute = ms => {
  const minute = ms / 1000 / 60;

  return minute;
};

export const isTimeLimitOver = (dataRefreshLimitPerMinute, lastDateUpdate) => {
  // NOTE: We are converting the time of lastDateUpdate as it can be a string or a date object
  const timeLimitOver = dataRefreshLimitPerMinute < toMinute(Date.now() - new Date(lastDateUpdate));

  return timeLimitOver;
};

export const toSecond = ms => {
  const second = ms / 1000;

  return second;
};

export const getRemainingTime = (dataRefreshLimitPerMinute, lastDateUpdate) => {
  const remainingTime =
    dataRefreshLimitPerMinute * 60 - toSecond(Date.now() - new Date(lastDateUpdate));

  return round(remainingTime, 0);
};
