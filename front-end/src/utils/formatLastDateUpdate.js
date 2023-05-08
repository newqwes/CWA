import moment from 'moment/moment';

const getNoun = (number, one, two, five) => {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return two;
  }
  return five;
};
export const formatLastDateUpdate = (date, gender) => {
  if (date) {
    const now = moment(); // Текущая дата и время
    const lastUpdate = moment(date); // Дата последнего обновления
    const duration = moment.duration(now.diff(lastUpdate));

    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes());

    let genderPrefix;
    let genderSuffix;

    switch (gender) {
      case 'female':
        genderPrefix = 'заходила';
        genderSuffix = 'была';
        break;
      default:
        genderPrefix = 'заходил';
        genderSuffix = 'был';
        break;
    }

    if (days > 1) {
      return `${genderPrefix} ${days} ${getNoun(days, 'день', 'дня', 'дней')} назад`;
    } if (hours > 1) {
      return `${genderSuffix} ${hours} ${getNoun(hours, 'час', 'часа', 'часов')} назад`;
    }
    return `${genderSuffix} ${minutes} ${getNoun(minutes, 'минуту', 'минуты', 'минут')} назад`;
  }

  return 'Никогда не заходил'; // Возвращаем сообщение по умолчанию, если дата не определена
};
