import React from 'react';
import { LeftCircleOutlined } from '@ant-design/icons';
import UserInfoUpdate from './Sections/UserInfoUpdate';
import UserImageUpdate from './Sections/UserImageUpdate';

function UserUpdatePage(props) {
  return (
    <div style={{ padding: '1rem' }}>
      <div
        style={{
          borderBottom: 'solid',
          borderColor: 'grey',
          paddingBottom: '0.5rem',
        }}
      >
        <a href="/mypage" style={{ textDecoration: 'none', color: 'grey' }}>
          <LeftCircleOutlined
            style={{ fontSize: '25px', marginRight: '10px' }}
          />
        </a>
        회원정보 수정
      </div>
      <UserImageUpdate userId={props.user.loginSuccess.id} />
      <UserInfoUpdate user={props.user.loginSuccess} />
    </div>
  );
}

export default UserUpdatePage;
