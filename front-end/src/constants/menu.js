import React from 'react';
import { PieChartOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';

export const MENU_KEYS = {
  statistics: '/statistics',
  users: '/users',
  chat: '/chat',
  git: '/git',
};

export const DEFAULT_SELECTED_MENU = MENU_KEYS.statistics;

export const DEFAULT_MODE_MENU = 'inline';

export const MENU = [
  {
    link: MENU_KEYS.statistics,
    title: 'Статистика',
    icon: <PieChartOutlined />,
  },
  { link: MENU_KEYS.users, title: 'Пользователи', icon: <UserOutlined /> },
  { link: MENU_KEYS.chat, title: 'Чат', icon: <WechatOutlined /> },
  { link: MENU_KEYS.git, title: 'Гит', icon: <WechatOutlined /> },
];
