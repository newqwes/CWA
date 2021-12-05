import React from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';

export const MENU_KEYS = {
  statistics: 'statistics',
  users: 'users',
};

export const DEFAULT_SELECTED_MENU = [MENU_KEYS.statistics];

export const DEFAULT_MODE_MENU = 'inline';

export const MENU = [
  { key: MENU_KEYS.statistics, title: 'Статистика', icon: <PieChartOutlined /> },
  { key: MENU_KEYS.users, title: 'Пользователи', icon: <UserOutlined /> },
];
