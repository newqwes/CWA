import React from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import { MADAL_BUTTONS } from '../constants/modal';

export const deleteUserDataModalConfig = {
  title: 'Вы действительно хотите удалить данные?',
  buttonText: 'Удалить данные',
  okType: 'danger',
  okText: MADAL_BUTTONS.yes,
  cancelText: MADAL_BUTTONS.no,
  icon: <ExclamationCircleOutlined />,
};
