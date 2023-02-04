import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login, Register } from 'pages/Auth';
import {
  ActivationEmail,
  DataBase,
  EditDocument,
  ForgotPassword,
  NotFound,
  ResetPassword,
  TaskCreate,
  TaskPage,
  Tracking,
  UserManual,
} from 'components';
import { EditProfile, EditUser } from 'pages/Profile';
import Home from 'pages/Home';
import AdminMenu from 'components/AdminMenu';

import './index.scss';

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  return (
    <section className="body">
      <div className="container">
        <Switch>
          {/* 
          // TODO Create conditional for redirect to /home...
        */}

          <Route exact path="/" component={Home} />

          <Route exact path="/tracking" component={Tracking} />

          <Route exact path="/admin_menu" component={AdminMenu} />

          <Route exact path="/user_manual" component={UserManual} />

          <Route
            exact
            path="/login"
            component={isLogged ? NotFound : Login}
          />

          <Route
            exact
            path="/register"
            component={isLogged ? NotFound : Register}
          />

          <Route
            exact
            path="/user/activate/:activation_token"
            component={ActivationEmail}
          />

          <Route
            exact
            path="/profile"
            component={isLogged ? EditProfile : NotFound}
          />

          {/* Tasks */}
          <Route
            exact
            path="/tasks"
            component={isLogged ? TaskPage : NotFound}
          />

          <Route
            exact
            path="/data_base"
            component={isLogged ? DataBase : NotFound}
          />

          {isAdmin || auth.user.position !== 'Автор' ? (
            <Route
              exact
              path="/edit_document/:id"
              component={EditDocument}
            />
          ) : null}

          <Route
            exact
            path="/edit_user/:id"
            component={isAdmin ? EditUser : NotFound}
          />

          <Route
            exact
            path="/forgot_password"
            component={isLogged ? NotFound : ForgotPassword}
          />

          <Route
            exact
            path="/user/reset/:token"
            component={isLogged ? NotFound : ResetPassword}
          />
        </Switch>
      </div>
    </section>
  );
};

export default Body;
