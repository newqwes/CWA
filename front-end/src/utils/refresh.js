const minuteToMillisecond = minute => minute * 60 * 1000;

export const getRefreshTimer = (lastDateUpdate, dataRefreshLimitPerMinute) => {
  if (Date.parse(lastDateUpdate) < Date.now() - minuteToMillisecond(2)) {
    return 0;
  }
  return (
    Date.parse(lastDateUpdate) + minuteToMillisecond(dataRefreshLimitPerMinute) - Date.now()
  ) / 1000;
};
