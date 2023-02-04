import React from 'react';
import {
  Collapse,
  Steps,
  Divider,
  Input,
  Upload,
  Modal,
  message,
  Table,
  Tag,
  Space,
  Button,
} from 'antd';

import image from 'images/user-manual/image.svg';
import Author from './Author';

import './index.scss';

const UserManual = () => {
  const { Panel } = Collapse;

  return (
    <div className="user-manual">
      <div className="image-wrapper">
        <img src={image} alt="Image" />
      </div>

      <h2>Руководство пользователя</h2>

      <i class="fas fa-hand-pointer"></i>

      <Collapse>
        <Panel header="Автор" key="1">
          <Author />
        </Panel>
        <Panel header="Сотрудник" key="2">
          <p>Руководство для сотрудника</p>
        </Panel>
        <Panel header="Админ" key="3">
          <p>Руководство для админа</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default UserManual;
