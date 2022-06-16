import React from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import { MADAL_BUTTONS } from '../constants/modal';

export const deleteUserModalConfig = {
  title: 'Вы действительно хотите удалить аккаунт?',
  okType: 'danger',
  okText: MADAL_BUTTONS.yes,
  cancelText: MADAL_BUTTONS.no,
  icon: <ExclamationCircleOutlined />,
};
