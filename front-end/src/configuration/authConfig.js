import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AUTH_INPUT_RULE, AUTH_FIELDS } from '../constants/authModal';

export const authFormItems = [
  {
    name: AUTH_FIELDS.username,
    rules: AUTH_INPUT_RULE,
    placeholder: 'почта',
    prefix: <UserOutlined />,
  },
  {
    name: AUTH_FIELDS.password,
    rules: AUTH_INPUT_RULE,
    placeholder: 'пароль',
    prefix: <LockOutlined />,
  },
];

// TODO
export const initialAuthData = {};
