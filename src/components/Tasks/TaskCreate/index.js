import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import { Radio } from 'antd';

import './index.scss';

const TaskCreate = ({ filesArray, setFilesArray }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [comment, setComment] = useState('');
  const [check, setCheck] = useState(0);
  // const [filesArray, setFilesArray] = useState([]);

  const { auth } = useSelector((state) => state);

  const addToFilesArray = () => {
    setFilesArray([...filesArray, selectedFile]);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // console.log(filesArray);
  // console.log(selectedFile);

  // const testArr = (filesArray) => {
  //   return filesArray.map((element) => (
  //     <tr>
  //       <td>{element.name}</td>
  //       <td>
  //         {moment(element.lastModifiedDate).format('DD.MM.YYYY hh:mm:ss')}
  //       </td>
  //       <td>{element.size} Кбайт</td>
  //       <td>{element.type}</td>
  //     </tr>
  //   ));
  // };

  const onFileUpload = async () => {
    try {
      addToFilesArray();
      const formData = new FormData();

      const fileData = {
        name: selectedFile.name,
        lastModified: selectedFile.lastModified,
        size: selectedFile.size,
        type: transformType(selectedFile),
        position: auth.user.position,
        faculty: auth.user.faculty,
        comment,
        userId: auth.user._id,
      };

      formData.append('file', selectedFile);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      await axios.post('/user/upload_document', fileData);
    } catch (error) {
      console.log(error);
    }
  };

  // const transformType = (selectedFile) => {
  //   return selectedFile.type.split('/')[1].toUpperCase();
  // };

  const transformType = (selectedFile) => {
    if (selectedFile.name.split('.')[1] === 'pdf') {
      return 'pdf';
    }
    if (selectedFile.name.split('.')[1] === 'docx') {
      return 'docx';
    }
    if (selectedFile.name.split('.')[1] === 'doc') {
      return 'doc';
    }
  };

  // Checkbox
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setCheck(e.target.value);
  };

  return (
    <div className="tasks__create">
      <h2 className="title">Загрузите документы для отправки отправки</h2>
      <div>
        <div className="tasks__create-inner">
          <div className="input-wrapper">
            <input type="file" onChange={onFileChange} />
            {!selectedFile && <span className="text">Файл не выбран</span>}
          </div>

          <label>
            Введите свой комметарий
            <textarea onChange={(e) => setComment(e.target.value)} />
          </label>

          <div className="checkboxes">
            Макет:{' '}
            <Radio.Group onChange={onChange} value={check}>
              <Radio value={1}>Да</Radio>
              <Radio value={2}>Нет</Radio>
            </Radio.Group>
          </div>

          <div className="buttons">
            <button className="btn">Отмена</button>
            <button className="btn" onClick={onFileUpload}>
              Отправить
            </button>
          </div>
        </div>

        <table>
          <tr>
            <td>Название</td>
            <td>Последнее изменение</td>
            <td>Размер</td>
            <td>Тип</td>
          </tr>

          {filesArray.length
            ? filesArray.map((element) => (
                <tr key={element.name}>
                  <td>{element.name}</td>
                  <td>
                    {moment(element.lastModifiedDate).format(
                      'DD.MM.YYYY, hh:mm:ss'
                    )}
                  </td>

                  <td>
                    {Math.ceil((element.size / 1024) * 100) / 100} Кбайт
                  </td>
                  <td>
                    документ {selectedFile ? transformType(element) : null}
                  </td>
                </tr>
              ))
            : null}
        </table>
      </div>
    </div>
  );
};

export default TaskCreate;
