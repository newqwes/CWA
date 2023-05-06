import React from 'react';
import {
  CalculatorOutlined,
  PieChartOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
} from '@ant-design/icons';

export const MENU_KEYS = {
  home: '/home',
  statistics: '/statistics',
  users: '/users',
  chat: '/chat',
  calculator: '/calculator',
  profile: '/profile/:login',
};

export const DEFAULT_SELECTED_MENU = MENU_KEYS.home;

export const DEFAULT_MODE_MENU = 'inline';

export const MENU = [
  {
    link: MENU_KEYS.statistics,
    title: 'Статистика',
    icon: <PieChartOutlined />,
  },
  { link: MENU_KEYS.users, title: 'Пользователи', icon: <UsergroupAddOutlined /> },
  { link: MENU_KEYS.chat, title: 'Чат', icon: <WechatOutlined /> },
  { link: MENU_KEYS.calculator, title: 'Калькулятор', icon: <CalculatorOutlined /> },
];
