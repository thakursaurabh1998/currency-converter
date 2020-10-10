import { Button, Card, Col, Form, Input, Row } from 'antd';
import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { openNotification } from '../utils/NotificationUtility';
import logo from '../static/logo.svg';
import * as HTTPRequests from '../utils/HTTPRequests';
import { UserContext } from '../store/contexts';
import RoutesEnum from '../utils/RoutesEnum';

function Login({ history }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const accessToken = await HTTPRequests.login(email, password);
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      history.push('/');
    } catch (error) {
      openNotification('BANNER', 'error', error.message);
    }
  };

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
                <Form
                  size="large"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default withRouter(Login);
