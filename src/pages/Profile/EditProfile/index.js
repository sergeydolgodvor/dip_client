import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { isLength, isMatch } from 'utils/validations';
import { showSuccessMsg, showErrMsg } from 'utils/notifications';
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from 'redux/actions/userAction';

import initials from '../../../utils/initials';

import './index.scss';

const Profile = () => {
  const initialState = {
    name: '',
    password: '',
    cf_password: '',
    faculty: '',
    position: '',
    err: '',
    success: '',
  };

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success, faculty, position } =
    data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) {
        return setData({
          ...data,
          err: 'No files were uploaded.',
          success: '',
        });
      }

      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: 'Size too large.', success: '' });
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return setData({
          ...data,
          err: 'File format is incorrect.',
          success: '',
        });
      }

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/upload_avatar', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const updateInfo = () => {
    try {
      axios.patch(
        '/user/update',
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
          faculty: faculty ? faculty : user.faculty,
          position: position ? position : user.position,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: '', success: 'Обновление успешно!' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: 'Password must be at least 6 characters.',
        success: '',
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: 'Password did not match.',
        success: '',
      });

    try {
      axios.post(
        '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: '', success: 'Updated Success!' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const handleUpdate = () => {
    if (name || avatar || faculty || position) updateInfo();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (
          window.confirm('Вы уверены, что хотите удалить этот аккаунт?')
        ) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Загрузка.....</h3>}
      </div>
      <div className="profile-page">
        <div className="col-left">
          <h2>{isAdmin ? 'Админ' : 'Пользователь'}</h2>

          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Изменить</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Ваше имя"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Ваш email"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Новый пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ваш пароль"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Подтвердите свой пароль</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Подвтердите пароль"
              value={cf_password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="faculty">Факультет</label>
            <input
              name="faculty"
              id="faculty"
              placeholder="Факультет"
              defaultValue={user.faculty}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Позиция</label>
            <input
              name="position"
              id="position"
              placeholder="Позиция"
              defaultValue={user.position}
              onChange={handleChange}
            />
          </div>

          <button disabled={loading} onClick={handleUpdate}>
            Обновить
          </button>
        </div>

        {/* {isAdmin ? (
          <div className="col-right">
            <h2>Пользователи</h2>

            <div style={{ overflowX: 'auto' }}>
              <table className="customers">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Админ</th>
                    <th>Изменение БД</th>
                    <th>Чтение БД</th>
                    <th>Админ</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === 1 ? (
                          <i className="fas fa-check" title="Admin"></i>
                        ) : (
                          <i className="fas fa-times" title="User"></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/edit_user/${user._id}`}>
                          <i className="fas fa-edit" title="Edit"></i>
                        </Link>
                        <i
                          className="fas fa-trash-alt"
                          title="Remove"
                          onClick={() => handleDelete(user._id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null} */}
      </div>
    </>
  );
};

export default Profile;
