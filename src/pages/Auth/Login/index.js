import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { showErrMsg, showSuccessMsg } from 'utils/notifications';
import { dispatchLogin } from 'redux/actions/authAction';
import { useDispatch } from 'react-redux';
import image from 'images/register/frame.svg';

import './index.scss';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
    err: '',
    success: '',
  };

  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password });
      setUser({
        ...user,
        err: '',
        success: res.data.msg,
      });

      localStorage.setItem('firstLogin', true);

      dispatch(dispatchLogin());
      history.push('/');
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: '',
        });
    }
  };

  const responseGoogle = async (response) => {
    try {
      console.log(response);
      const res = await axios.post('/user/google_login', {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: '', success: res.data.msg });
      localStorage.setItem('firstLogin', true);

      dispatch(dispatchLogin());
      history.push('/');
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: '',
        });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post('/user/facebook_login', {
        accessToken,
        userID,
      });

      setUser({ ...user, error: '', success: res.data.msg });
      localStorage.setItem('firstLogin', true);

      dispatch(dispatchLogin());
      history.push('/');
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' });
    }
  };

  return (
    <div className="login-page">
      <div className="left-content">
        <h2>Авторизация</h2>

        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
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

          <div className="row">
            <button type="submit">Войти</button>
            <Link to="/forgot_password">Забыли пароль?</Link>
          </div>
        </form>

        {/* <div className="hr">Or Login With</div>

        <div className="social">
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
            buttonText="Login with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_CLIENT}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div> */}

        <p>
          Новый пользователь? <Link to="/register">Регистрация</Link>
        </p>
      </div>

      <div className="right-content">
        <img src={image} alt="Image" />
      </div>
    </div>
  );
};

export default Login;
