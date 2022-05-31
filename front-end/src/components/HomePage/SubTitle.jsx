import React from 'react';
import { Link } from 'react-router-dom';
import { MENU_KEYS } from '../../constants/menu';

const SubTitle = () => (
  <span>
    Сервис находится на стадии разработки, пока доступна возожность просмотра
    <Link to={MENU_KEYS.statistics}> статистики </Link>по криптокошельку.
    <br /> Так же ниже доступны дополнительные ссылки на ресурсы.
  </span>
);

export default SubTitle;
