import React from 'react';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  AUTH_INPUT_RULE,
  AUTH_FIELDS,
  AUTH_MADAL_TITLE,
  REGISTRATION_MADAL_TITLE,
  LOGIN_RULE,
  MAIL_RULE,
  PASSWORD_RULE,
} from '../constants/authModal';
import { HTML_TYPE, MADALS_NAME, MADAL_BUTTONS, MODAL_WIDTH } from '../constants/modal';

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
  htmlType: HTML_TYPE,
  width: MODAL_WIDTH,
  okText: MADAL_BUTTONS.signUp,
  cancelText: MADAL_BUTTONS.сancel,
  formItems: registrationFormItems,
};

export const authModalConfig = {
  modalName: MADALS_NAME.authModal,
  title: AUTH_MADAL_TITLE,
  initialValues: {},
  htmlType: HTML_TYPE,
  width: MODAL_WIDTH,
  okText: MADAL_BUTTONS.signIn,
  cancelText: MADAL_BUTTONS.сancel,
  formItems: authFormItems,
};

export const logoutModalConfig = {
  title: 'Вы действительно хотите выйти?',
  buttonText: 'Выйти',
  okText: MADAL_BUTTONS.yes,
  cancelText: MADAL_BUTTONS.no,
  icon: <ExclamationCircleOutlined />,
};
