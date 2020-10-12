import { Card, Col, Row } from 'antd';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import logo from '../../static/logo.svg';
import { UserContext } from '../../store/contexts';
import { RoutesEnum } from '../../constants/index';
import LoginForm from './components/LoginForm';

export default function Login() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <>
      {isAuthenticated ? (
        <Redirect to={RoutesEnum.ROOT} />
      ) : (
        <div className="Login-page">
          <Row justify="center" align="middle">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          </Row>
          <Row justify="center" align="middle" className="Login-card">
            <Col sm={7} xs={21}>
              <Card size="small" title={<h2>Verify Identity</h2>}>
                <LoginForm />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
