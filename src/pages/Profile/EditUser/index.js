import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { showSuccessMsg, showErrMsg } from 'utils/notifications';

import './index.scss';

const EditUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  // Edit DB
  const [checkEditDB, setCheckEditDB] = useState(false);
  const [numEditDB, setNumEditDB] = useState(0);

  // Read DB
  const [checkReadDB, setCheckReadDB] = useState(false);
  const [numReadDB, setNumReadDB] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);

          // Check Edit DB
          setEditUser(user);
          setCheckEditDB(user.editDB === 1 ? true : false);

          // Check Read DB
          setEditUser(user);
          setCheckReadDB(user.readDB === 1 ? true : false);
        }
      });
    } else {
      history.push('/admin_menu');
    }
  }, [users, id, history]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setSuccess('');
    setErr('');
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  // Edit DB
  const handleUpdateEditDB = async () => {
    try {
      if (numEditDB % 2 !== 0) {
        const res = await axios.patch(
          `/user/edit_db/${editUser._id}`,
          {
            editDB: checkEditDB ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNumEditDB(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheckEditDB = () => {
    setSuccess('');
    setErr('');
    setCheckEditDB(!checkEditDB);
    setNumEditDB(numEditDB + 1);
  };

  // Read DB
  const handleUpdateReadDB = async () => {
    try {
      if (numReadDB % 2 !== 0) {
        const res = await axios.patch(
          `/user/read_db/${editUser._id}`,
          {
            readDB: checkReadDB ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNumReadDB(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheckReadDB = () => {
    setSuccess('');
    setErr('');
    setCheckReadDB(!checkReadDB);
    setNumReadDB(numReadDB + 1);
  };

  console.log(checkEditDB, numEditDB);

  return (
    <div className="profile-page edit-user">
      <div className="row">
        <button onClick={() => history.goBack()} className="go-back">
          <i className="fas fa-long-arrow-alt-left"></i> Назад
        </button>
      </div>

      <div className="col-left">
        <h2>Изменить пользователя</h2>

        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="actions-wrapper">
          <div className="actions">
            <div className="form-group">
              <input
                type="checkbox"
                id="isAdmin"
                checked={checkAdmin}
                onChange={handleCheck}
              />
              <label htmlFor="isAdmin">Админ</label>
            </div>

            <button onClick={handleUpdate}>Изменить</button>
          </div>

          <div className="actions">
            <div className="form-group">
              <input
                type="checkbox"
                id="isEditDB"
                checked={checkEditDB}
                onChange={handleCheckEditDB}
              />
              <label htmlFor="isEditDB">Изменения БД</label>
            </div>

            <button onClick={handleUpdateEditDB}>Изменить</button>
          </div>

          <div className="actions">
            <div className="form-group">
              <input
                type="checkbox"
                id="isReadDB"
                checked={checkReadDB}
                onChange={handleCheckReadDB}
              />
              <label htmlFor="isReadDB">Чтение ДБ</label>
            </div>

            <button onClick={handleUpdateReadDB}>Изменить</button>
          </div>
        </div>

        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  );
};

export default EditUser;
