import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { showErrMsg, showSuccessMsg } from 'utils/notifications';
import { isEmpty, isEmail, isLength, isMatch } from 'utils/validations';

import image from 'images/register/frame.svg';

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  phone: '',
  faculty: '',
  position: '',
  err: '',
  success: '',
};

const Register = () => {
  const [user, setUser] = useState(initialState);

  const {
    name,
    email,
    password,
    cf_password,
    err,
    success,
    phone,
    faculty,
    position,
  } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password)) {
      return setUser({ ...user, err: 'Заполните все поля.', success: '' });
    }
    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: 'Недействительный email.',
        success: '',
      });
    }

    if (isLength(password))
      return setUser({
        ...user,
        err: 'Пароль должен быть не менее 6 символов.',
        success: '',
      });

    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: 'Пароли не совпадают.',
        success: '',
      });
    }

    try {
      const res = await axios.post('/user/register', {
        name,
        email,
        password,
        phone,
        faculty,
        position,
      });

      setUser({ ...user, err: '', success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' });
    }
  };

  return (
    <div className="login-page">
      <div className="left-content">
        <h2>Регистрация</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">ФИО</label>
            <input
              type="text"
              placeholder="Введите ФИО"
              id="name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Введите email"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              id="password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="cf_password">Повторите пароль</label>
            <input
              type="password"
              placeholder="Повторите пароль"
              id="cf_password"
              value={cf_password}
              name="cf_password"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="cf_password">Ваш контактный номер</label>
            <input
              type="phone"
              placeholder="8-913-567-45-42"
              id="phone"
              value={phone}
              name="phone"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="faculty">Выбор факультета</label>

            <select
              id="faculty"
              name="faculty"
              onChange={handleChangeInput}
              value={faculty}
              required
            >
              <option value="" selected disabled hidden>
                Выбор факультета
              </option>
              <option value="ГТФ">ГТФ</option>
              <option value="ИМА">ИМА</option>
              <option value="СМФ">СМФ</option>
              <option value="ФУВТ">ФУВТ</option>
              <option value="ЭМФ">ЭМФ</option>
            </select>
          </div>

          <div>
            <label htmlFor="position">Позиция</label>

            <select
              id="position"
              name="position"
              onChange={handleChangeInput}
              value={position}
              required
            >
              <option value="" selected disabled hidden>
                Позиция
              </option>
              <option value="Автор">Автор</option>{' '}
              <option value="Представитель учебно-методического совета факультета">
                Представитель учебно-методического совета факультета
              </option>
              <option value="Представитель библиотеки">
                Представитель библиотеки
              </option>
              <option value="Представитель редакционного совета факультета">
                Представитель редакционного совета факультета
              </option>
              <option value="Представитель редакции">
                Представитель редакции
              </option>
              <option value="Представитель типографии">
                Представитель типографии
              </option>
            </select>
          </div>

          <div className="row">
            <button type="submit">Зарегестрироваться</button>
          </div>
        </form>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>

      <div className="right-content">
        <img src={image} alt="Image" />
      </div>
    </div>
  );
};

export default Register;
