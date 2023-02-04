import React from 'react';
import { Alert, notification, Space } from 'antd';

import './index.scss';

export const showErrMsg = (msg) => {
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Ошибка!',
      description: msg,
    });
  };

  return <Space>{openNotificationWithIcon('error')}</Space>;
};

export const showSuccessMsg = (msg) => {
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Успешно!',
      description: msg,
    });
  };

  return <Space>{openNotificationWithIcon('success')}</Space>;
};
