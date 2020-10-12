import { Button, Form, Input } from 'antd';
import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { UserContext } from '../../../store/contexts';
import { openNotification } from '../../../utils/notification';
import * as HTTPRequests from '../httpRequests';

function LoginForm({ history }) {
  const { setIsAuthenticated } = useContext(UserContext);

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
    <Form size="large" name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
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
  );
}

export default withRouter(LoginForm);
