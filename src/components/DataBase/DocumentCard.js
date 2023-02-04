import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Button } from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

import documentImage from 'images/data-base/document-image.jpg';

const DocumentCard = ({ filterFaculty }) => {
  const { token, auth } = useSelector((state) => state);
  const history = useHistory();
  const [documentId, setDocumentId] = useState('');

  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setDocumentId(inputRef.current.value);
    }, 0);
  }, []);

  // Remove document
  const handleRemove = async () => {
    try {
      let answer = window.confirm(
        'Вы уверены, что хотите удалить этот документ?'
      );

      if (answer) {
        await axios.delete(`/api/remove_document/${documentId}`, {
          headers: { Authorization: token },
        });
        history.push('/data_base');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="document-card">
      {filterFaculty.map((item) => (
        <Card
          key={item._id}
          hoverable
          cover={<img alt="Document image" src={documentImage} />}
        >
          <div className="description">
            <h3>Статус:</h3> {item.step === 4 ? 'Завершен' : 'Выполняется'}
            <br />
            <h3>Название:</h3> {item.name}
            <br />
            <br />
            <p>
              <strong>Номер:</strong> <br />
              {item._id}
            </p>
            <p>
              <strong>Загружен:</strong>
              <br />
              {moment(item.createdAt).format('DD.MM.YYYY, hh:mm:ss')}
            </p>
            <p>
              <strong>Последнее изменение:</strong>
              <br />
              {moment(item.lastModified).format('DD.MM.YYYY, hh:mm:ss')}
            </p>
            <p>
              <strong>Формат:</strong> <br />.{item.type}
            </p>
            <p>
              <strong>Размер:</strong> <br />{' '}
              {Math.ceil((item.size / 1024) * 100) / 100} Кб
            </p>
          </div>

          <div className="buttons">
            <Link
              to={`/documents/${item.name}.${item.type}`}
              target="_blank"
              download
            >
              <Button type="primary" icon={<DownloadOutlined />}>
                Скачать
              </Button>
            </Link>

            {auth.user.editDB === 1 || auth.user.role === 1 ? (
              <Button
                className="button-delete"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={handleRemove}
              >
                <input
                  style={{ position: 'absolute', visibility: 'hidden' }}
                  type="text"
                  value={item._id}
                  ref={inputRef}
                />
                Удалить
              </Button>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DocumentCard;
