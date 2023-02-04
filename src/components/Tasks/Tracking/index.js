import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Collapse,
  Steps,
  Input,
  Table,
  Modal,
  Button,
  Card,
  Avatar,
} from 'antd';
import moment from 'moment';

import { findDocument } from 'redux/actions/documentAction';

import './index.scss';

const ModalAuthor = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Meta } = Card;

  return (
    <>
      <a type="primary" onClick={showModal}>
        {user.name}
      </a>
      <Modal
        title="Карточка пользователя"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card>
          <Meta
            avatar={<Avatar src={user.avatar} />}
            title={user.name}
            description={
              <>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <p>
                  Телефон: <span>{user.phone}</span>
                </p>
                <p>
                  Факультет: <span>{user.faculty}</span>
                </p>
              </>
            }
          />
          <p className="position">{user.position}</p>
        </Card>
      </Modal>
    </>
  );
};

const TaskNew = () => {
  const [stepState, setStepState] = useState(0);

  const { auth, token, documents } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = (documentId) => {
    dispatch(findDocument({ documentId, token }));
  };

  Object.size = function (obj) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  let foundDocumentSize = Object.size(documents.foundDocument);

  // Steps
  const { Step } = Steps;

  const nextStep = () => {
    setStepState(stepState + 1);
  };
  const prevStep = () => {
    setStepState(stepState - 1);
  };

  console.log(stepState);

  // Search
  const { Search } = Input;

  // Collapse
  const { Panel } = Collapse;

  // Table
  const columns = [
    {
      title: 'Номер',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Автор',
      dataIndex: 'user',
      key: 'user',
      render: (text) => (
        <ModalAuthor user={documents.foundDocument.user} />
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      _id: documents.foundDocument._id,
      createdAt: moment(documents.foundDocument.createdAt).format(
        'DD.MM.YYYY, hh:mm:ss'
      ),
      user: foundDocumentSize && documents.foundDocument.user.name,
      status:
        documents.foundDocument.step === 4 ? 'Завершен' : 'Выполняется',
    },
  ];

  return (
    <div className="task__new">
      <div className="block-document">
        <div className="follow">
          <h2>Отслеживание</h2>

          <Search
            placeholder="Поиск документа"
            onSearch={handleSearch}
            enterButton
          />

          {foundDocumentSize > 0 && (
            <>
              <Button onClick={prevStep}>Prev</Button>
              <Button onClick={nextStep}>Next</Button>

              <Table columns={columns} dataSource={data} />
              <Collapse defaultActiveKey={[]}>
                <Panel header="Путь документа" key="1">
                  <div className="author-name">
                    <span className="author-name__title">Автор</span>
                    <div className="author-name__fio">
                      {documents.foundDocument.user.name}
                    </div>
                  </div>
                  <div className="document-date-wrapper">
                    <div className="document-date">
                      {moment(documents.foundDocument.createdAt).format(
                        'DD.MM.YYYY'
                      )}
                      <div>
                        {moment(documents.foundDocument.createdAt).format(
                          'hh:mm:ss'
                        )}
                      </div>
                    </div>
                    <div className="document-date">
                      N.N.N <div>N:N</div>
                    </div>
                    <div className="document-date">
                      N.N.N <div>N:N</div>
                    </div>
                    <div className="document-date">
                      N.N.N <div>N:N</div>
                    </div>
                    <div className="document-date">
                      N.N.N <div>N:N</div>
                    </div>
                    <div className="document-date">
                      N.N.N <div>N:N</div>
                    </div>
                  </div>
                  <Steps
                    // progressDot
                    current={1}
                    direction="vertical"
                  >
                    <Step
                      className="step-invisible"
                      title={
                        documents.foundDocument.step === 0
                          ? 'Завершено'
                          : 'Ожидание'
                      }
                      description="Автор отправил документы 
        в учебно-методический совет факультета."
                      // icon={<img src={documentSvg} />}
                      // status={
                      //   stepState === 0
                      //     ? 'current'
                      //     : stepState > 0
                      //     ? 'wait'
                      //     : 'process'
                      // }
                    />
                    <Step
                      title="Ожидание"
                      description="Документы оправлены из
        учебно-методического совета факультета
        в библиотеку."
                    />
                    <Step
                      title="Ожидание"
                      description="Документы оправлены из
        библиотеки в редакционный совет
        университета."
                    />
                    <Step
                      title="Ожидание"
                      description="Документы оправлены из
                  редакционного совета университета 
                  к заведующему библиотекой."
                    />
                    <Step
                      title="Ожидание"
                      description="Документы оправлены  от заведующего
                  библиотекой в редакцию."
                    />
                    <Step
                      title="Ожидание"
                      description="Документы оправлены  из редакции
                  в типографию."
                    />
                    <Step
                      title="Ожидание"
                      description="Документы оправлены  из редакции
                  в типографию."
                    />
                  </Steps>
                </Panel>
              </Collapse>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskNew;
