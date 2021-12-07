import React from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  AUTH_INPUT_RULE,
  AUTH_FIELDS,
  AUTH_MADAL_TITLE,
  REGISTRATION_MADAL_TITLE,
  LOGIN_RULE,
  MAIL_RULE,
  PASSWORD_RULE,
} from '../constants/authModal';
import { MADALS_NAME } from '../constants/modal';

export const authFormItems = [
  {
    name: AUTH_FIELDS.email,
    rules: AUTH_INPUT_RULE,
    placeholder: 'почта',
    prefix: <MailOutlined />,
  },
  {
    name: AUTH_FIELDS.password,
    rules: AUTH_INPUT_RULE,
    placeholder: 'пароль',
    prefix: <LockOutlined />,
  },
];

export const registrationFormItems = [
  {
    name: AUTH_FIELDS.login,
    rules: LOGIN_RULE,
    placeholder: 'логин',
    prefix: <UserOutlined />,
  },
  {
    name: AUTH_FIELDS.email,
    rules: MAIL_RULE,
    placeholder: 'почта',
    prefix: <MailOutlined />,
  },
  {
    name: AUTH_FIELDS.password,
    rules: PASSWORD_RULE,
    placeholder: 'пароль',
    prefix: <LockOutlined />,
  },
];

export const registrationModalConfig = {
  modalName: MADALS_NAME.registrationModal,
  title: REGISTRATION_MADAL_TITLE,
  initialValues: {},
  formItems: registrationFormItems,
};

export const authModalConfig = {
  modalName: MADALS_NAME.authModal,
  title: AUTH_MADAL_TITLE,
  initialValues: {},
  formItems: authFormItems,
};
