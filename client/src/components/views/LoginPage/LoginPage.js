import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './LoginPage.css';

function LoginPage() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const emailChangeHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const passwordChangeHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!Email || !Password) {
      return alert('모든 값을 입력해주세요.');
    }
  };

  return (
    <div className="loginpage">
      <div className="header">
        <h2> 로그인 </h2>
      </div>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            onChange={emailChangeHandler}
            value={Email}
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            onChange={passwordChangeHandler}
            value={Password}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <a href="">회원가입</a>
          <br />
          <a href="">비밀번호 찾기</a>
        </Form.Item>
      </form>
    </div>
  );
}

export default LoginPage;
