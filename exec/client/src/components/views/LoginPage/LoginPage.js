import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './LoginPage.css';
import { loginUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

function LoginPage(props) {
  const dispatch = useDispatch();
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
    let dataToSubmit = {
      username: Email,
      password: Password,
    };
    dispatch(loginUser(dataToSubmit))
      .then(res => {
        if (res.payload.loginSuccess) {
          window.localStorage.setItem('token', res.payload.token);
          props.history.push('/main');
        } else {
          if (res.payload.message1) {
            alert('비밀번호가 틀렸습니다.');
          } else {
            alert('존재하지 않는 이메일입니다.');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="loginpage">
      <div className="header">
        <img
          className="login_logo"
          src="/images/Fooding/로고 이미지.png"
          style={{ height: '200px', margin: 'auto' }}
        />
      </div>
      <form
        className="login_form"
        onSubmit={handleSubmit}
        style={{ width: '300px' }}
      >
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
        <div className="login_btn">
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{
                backgroundColor: '#F08080',
                borderColor: '#F08080',
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Link to="/register" style={{ color: 'black' }}>
              <Button
                style={{
                  backgroundColor: '#F08080',
                  borderColor: '#F08080',
                }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                회원가입
              </Button>
            </Link>
            <br />
          </Form.Item>
        </div>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
