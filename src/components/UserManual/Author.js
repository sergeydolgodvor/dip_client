import React from 'react';

import start from 'images/user-manual/author/tasks/start.PNG';
import createNew from 'images/user-manual/author/tasks/create-new.PNG';
import sendDocument from 'images/user-manual/author/tasks/send-document.PNG';

const Author = () => {
  return (
    <div className="author">
      <h3>Руководство для автора</h3>

      <div className="author__inner">
        <div>
          <p>
            Сперва нужно навести на свое ФИО и в выпадающем списке выбрать
            "задачи".
          </p>
          <img src={start} alt="" />

          <p>
            Далее нам нужно отпоравить документ. Для этого в левом углу
            нужно нажать на "Создать".
          </p>
          <img src={createNew} alt="" />

          <p>
            Ну и вот у вас появилась окно для загрузки документа. В этом
            окне есть кнопка, которая открвает модальное окно и вы можете
            выбрать загружаемый документ. Далее можно добавить комментарий
            и отправить.
          </p>
          <img src={sendDocument} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Author;
