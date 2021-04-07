import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { updateUserPassword } from '_api/User';

function UserInfoUpdate(props) {
  // const [nowPassword, setnowPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordCheck, setnewPasswordCheck] = useState('');
  const [Compare, setCompare] = useState(false);

  // const nowPasswordHandler = event => {
  //   // 현재 비밀번호 맞는지 확인해야함
  //   setnowPassword(event.currentTarget.value);
  // };
  const newPasswordHandler = event => {
    setnewPassword(event.currentTarget.value);
  };
  const newPasswordCheckHandler = event => {
    // 새로운 비밀번호랑 지금 번호랑 같은지 확인해야함
    if (newPassword === event.currentTarget.value) {
      setCompare(true);
    } else {
      setCompare(false);
    }
    setnewPasswordCheck(event.currentTarget.value);
  };

  const renderComparePW = () => {
    console.log(Compare);
    if (Compare) {
      return '비밀번호가 같습니다.';
    } else if (newPasswordCheck.length > 1 && !Compare) {
      return '비밀번호를 다시 확인해주세요.';
    }
    // if (newPassword === newPasswordCheck) {

    // }
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log(newPasswordCheck);
    console.log(newPassword);
    // nickname 만 변경,
    // password 만 변경
    // 둘 다 변경
    let body = {
      username: props.user.email,
      change_pw: newPassword,
    };
    console.log(body);

    updateUserPassword(body)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card bordered={true} style={{ width: 350 }}>
        <br />
        {/* <span style={{ fontSize: '12px' }}>현재 비밀번호</span>
        <Input
          onChange={nowPasswordHandler}
          type="password"
          value={nowPassword}
        ></Input> */}

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

export default UserInfoUpdate;
