import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './index.scss';

const TableTasks = ({ filteredDocuments }) => {
  const { documents, auth } = useSelector((state) => state);

  const authorDocumentsFunc = (documents) => {
    return documents.filter(
      (element) => element.user._id === auth.user._id
    );
  };
  const authorDocuments = filteredDocuments(documents);

  const noAuthorDocumentsFunc = (documents) => {
    return documents.filter(
      (element) => element.faculty === auth.user.faculty
    );
  };
  const noAuthorDocuments = filteredDocuments(documents);

  // .filter((element) => element.faculty === auth.user.faculty);

  // console.log(authorDocumentsFunc(authorDocuments));

  return (
    <div className="table-tasks">
      <table>
        <tr>
          <td>Трек-номер</td>
          <td>Название документа</td>
          <td>ФИО автора</td>
          <td>Факультет</td>
        </tr>

        {auth.user.position === 'Автор' && auth.user.role !== 1
          ? authorDocumentsFunc(authorDocuments).map((element) => (
              <tr key={element._id}>
                <td>
                  <Link to={`/edit_document/${element._id}`}>
                    {element._id}
                  </Link>
                </td>
                <td>{element.name}</td>
                <td>{element.user.name}</td>
                <td>{element.user.faculty}</td>
              </tr>
            ))
          : auth.user.position !== 'Автор' && auth.user.role !== 1
          ? noAuthorDocumentsFunc(noAuthorDocuments).map((element) => (
              <tr key={element._id}>
                <td>
                  <Link to={`/edit_document/${element._id}`}>
                    {element._id}
                  </Link>
                </td>
                <td>{element.name}</td>
                <td>{element.user.name}</td>
                <td>{element.faculty}</td>
              </tr>
            ))
          : auth.user.role === 1
          ? filteredDocuments(documents).map((element) => (
              <tr key={element._id}>
                <td>
                  <Link to={`/edit_document/${element._id}`}>
                    {element._id}
                  </Link>
                </td>
                <td>{element.name}</td>
                <td>{element.user.name}</td>
                <td>{element.faculty}</td>
              </tr>
            ))
          : null}
      </table>
    </div>
  );
};

export default TableTasks;
