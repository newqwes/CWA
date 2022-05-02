const minuteToMillisecond = minute => minute * 60 * 1000;

export const getRefreshTimer = (lastDateUpdate, dataRefreshLimitPerMinute) =>
  (Date.parse(lastDateUpdate) + minuteToMillisecond(dataRefreshLimitPerMinute) - Date.now()) / 1000;
