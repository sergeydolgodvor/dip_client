import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Modal, Button } from 'antd';

const Feedback = () => {
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

  const sendEmail = (e) => {
    e.preventDefault();
    setIsModalVisible(false);

    emailjs
      .sendForm(
        'gmail',
        'doc_tracking_management',
        e.target,
        'user_mPJehHZuRbEc6Hz28uNa6'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <div className="feedback">
      <Button type="primary" onClick={showModal}>
        <div className="blob">
          <i class="fas fa-comments"></i>
        </div>
      </Button>
      <Modal
        title="Отправьте ваше сообщение"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="login-page" onSubmit={sendEmail}>
          <label>
            ФИО: <input type="text" name="name" />
          </label>

          <label>
            Email: <input type="email" name="email" />
          </label>

          <label>
            Тема письма: <input type="text" name="subject" />
          </label>

          <label>
            Сообщение:{' '}
            <textarea name="message" style={{ resize: 'none' }} />
          </label>

          {/* <input type="submit" value="Send" /> */}

          <div className="row">
            <button type="submit" value="Send">
              Отправить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Feedback;
