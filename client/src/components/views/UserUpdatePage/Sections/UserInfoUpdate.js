import React, { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { updateUserPassword } from '_api/User';
import { withRouter } from 'react-router-dom';

function UserInfoUpdate(props) {
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordCheck, setnewPasswordCheck] = useState('');
  const [Compare, setCompare] = useState(false);
  const newPasswordHandler = event => {
    setnewPassword(event.currentTarget.value);
  };
  const newPasswordCheckHandler = event => {
    if (newPassword === event.currentTarget.value) {
      setCompare(true);
    } else {
      setCompare(false);
    }
    setnewPasswordCheck(event.currentTarget.value);
  };

  const renderComparePW = () => {
    if (Compare) {
      return '비밀번호가 같습니다.';
    } else if (newPasswordCheck.length > 1 && !Compare) {
      return '비밀번호를 다시 확인해주세요.';
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    let body = {
      username: props.user.email,
      change_pw: newPassword,
    };
    console.log(body);
    if (newPassword.lenth === 0 || newPasswordCheck.length === 0) {
      alert('비밀번호를 입력해주세요.');
    } else {
      updateUserPassword(body)
        .then(res => {
          console.log(res);
          props.history.push('/mypage');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card bordered={true} style={{ width: 350 }}>
        <br />
        <span style={{ fontSize: '12px' }}>비밀번호</span>
        <Input
          onChange={newPasswordHandler}
          type="password"
          value={newPassword}
        ></Input>
        <br />
        <br />
        <span style={{ fontSize: '12px' }}>비밀번호 확인</span>
        <Input
          onChange={newPasswordCheckHandler}
          type="password"
          value={newPasswordCheck}
        ></Input>
        <p style={{ color: 'red' }}>{renderComparePW()}</p>
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={submitHandler}>확인</Button>
        </div>
      </Card>
    </div>
  );
}

export default withRouter(UserInfoUpdate);
