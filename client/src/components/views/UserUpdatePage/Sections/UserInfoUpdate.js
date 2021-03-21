import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'antd';

function UserInfoUpdate() {
  const [nickName, setnickName] = useState('');
  const [nowPassword, setnowPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordCheck, setnewPasswordCheck] = useState('');

  const nickNameHandler = event => {
    setnickName(event.currentTarget.value);
  };
  const nowPasswordHandler = event => {
    // 현재 비밀번호 맞는지 확인해야함
    setnowPassword(event.currentTarget.value);
  };
  const newPasswordHandler = event => {
    setnewPassword(event.currentTarget.value);
  };
  const newPasswordCheckHandler = event => {
    // 새로운 비밀번호랑 지금 번호랑 같은지 확인해야함
    setnewPasswordCheck(event.currentTarget.value);
  };

  const submitHandler = () => {
    // nickname 만 변경,
    // password 만 변경
    // 둘 다 변경
    console.log(nickName);
    console.log(newPassword);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card bordered={true} style={{ width: 350 }}>
        <span style={{ fontSize: '12px' }}>닉네임</span>
        <Input onChange={nickNameHandler} value={nickName}></Input>
        <br />
        <br />
        <span style={{ fontSize: '12px' }}>현재 비밀번호</span>
        <Input
          onChange={nowPasswordHandler}
          type="password"
          value={nowPassword}
        ></Input>
        <br />
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
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={submitHandler}>확인</Button>
        </div>
      </Card>
    </div>
  );
}

export default UserInfoUpdate;
