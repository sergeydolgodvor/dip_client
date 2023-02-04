import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'antd';
import {
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

import { fetchAllDocuments } from 'redux/actions/documentAction';
import documentImage from 'images/data-base/document-image.jpg';

import './index.scss';

const EditDocument = () => {
  const { id } = useParams();
  const history = useHistory();
  const { documents, token, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(fetchAllDocuments(token));
  }, []);

  // Remove document
  const handleRemove = async () => {
    try {
      await axios.delete(`/api/remove_document/${id}`, {
        headers: { Authorization: token },
      });
      history.push('/tasks');
    } catch (err) {
      console.log(err);
    }
  };

  // Edit document
  const handleEdit = async () => {
    try {
      await axios.patch(
        `/api/edit_document/${id}`,
        { name },
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filterDocuments = (documents) => {
    return documents.allDocuments.filter((element) => element._id === id);
  };
  const filteredDocument = filterDocuments(documents);

  const sendDocument = () => {
    if (
      auth.user.position ===
      'Представитель учебно-методического совета факультета'
    ) {
      console.log('Документы отправлены к представителю библиотеки');
    }

    if (auth.user.position === 'Представитель библиотеки') {
      console.log('Документы отправлены в редакционный совет факультета');
    }

    if (auth.user.position === 'Редакционный совет факультета') {
      console.log('Документы отправлены к представителю редакции');
    }

    if (auth.user.position === 'Представитель редакции') {
      console.log('Документы отправлены к представителю типографии');
    }
  };

  return (
    <div className="edit-document">
      <Card hoverable style={{ width: 240 }}>
        <div className="description">
          <div className="responce-data">
            <h2>Полученные данные: </h2>
            <h3>
              Название:{' '}
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={filteredDocument[0].name}
              />
            </h3>

            <h3>
              Автор: <span>{filteredDocument[0].user.name}</span>
            </h3>

            <h3>
              Факультет: <span>{filteredDocument[0].user.faculty}</span>
            </h3>

            <br />
            <p>
              <strong>Номер: </strong>
              <input
                type="text"
                name="_id"
                id="_id"
                defaultValue={filteredDocument[0]._id}
                disabled
              />
              <br />
            </p>
            <p>
              <strong>Загружен: </strong>
              <input
                type="text"
                name="createdAt"
                id="createdAt"
                defaultValue={filteredDocument[0].createdAt}
                disabled
              />
              <br />
            </p>
            <p>
              <strong>Последнее изменение: </strong>
              <input
                type="text"
                name="lastModifiedDate"
                id="lastModifiedDate"
                defaultValue={moment(
                  filteredDocument[0].lastModifiedDate
                ).format('DD.MM.YYYY, hh:mm:ss')}
                disabled
              />
              <br />
            </p>
            <p>
              <strong>Формат: .</strong>
              <input
                type="text"
                name="type"
                id="type"
                defaultValue={filteredDocument[0].type}
                disabled
              />
            </p>
            <p>
              <strong>Размер: </strong>
              <input
                type="text"
                name="size"
                id="size"
                defaultValue={`${
                  Math.ceil((filteredDocument[0].size / 1024) * 100) / 100
                } Кбайт`}
                disabled
              />
            </p>

            <div>
              <strong>Комментарий: </strong>
              <p>{filteredDocument[0].comment}</p>
            </div>

            <div className="buttons">
              <Link
                to={`/documents/${filteredDocument[0].name}.${filteredDocument[0].type}`}
                target="_blank"
                download
              >
                <Button type="primary" icon={<DownloadOutlined />}>
                  Скачать
                </Button>
              </Link>

              <Button
                className="button-delete"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={handleRemove}
              >
                Удалить
              </Button>

              <Button
                className="button-edit"
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Изменить
              </Button>
            </div>
          </div>

          <div className="dispatch-data">
            <h2>Данные для отправления:</h2>

            <textarea
              name=""
              id=""
              cols="50"
              rows="2"
              placeholder="Введите свой комментарий"
            ></textarea>

            <br />
            <br />

            <div className="buttons">
              <Button type="primary" icon={<DownloadOutlined />}>
                Добавить документ
              </Button>

              <Button
                type="primary button-edit"
                icon={<DownloadOutlined />}
              >
                Отправить автору на доработку
              </Button>

              <Button
                onClick={sendDocument}
                type="primary"
                icon={<DownloadOutlined />}
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditDocument;
