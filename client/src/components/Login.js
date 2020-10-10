import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { openNotification } from '../utils/NotificationUtility';
import logo from '../static/logo.svg';
import * as HTTPRequests from '../utils/HTTPRequests';

function Login({ history }) {
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const accessToken = await HTTPRequests.login(email, password);
      localStorage.setItem('accessToken', accessToken);
      // set state to authenticated user
      history.push('/');
    } catch (error) {
      openNotification('BANNER', 'error', error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#282c34', minHeight: '100vh' }}>
      <Row justify="center" align="middle">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </Row>
      <Row justify="center" align="middle" className="Login-card">
        <Col sm={7} xs={21}>
          <Card size="small" title={<h2>Verify Identity</h2>}>
            <Form size="large" name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
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
  );
}

export default withRouter(Login);
