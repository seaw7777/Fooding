import React from 'react';
import { Avatar, Badge, Card } from 'antd';
import UserInfoUpdate from './Sections/UserInfoUpdate';
import {
  LeftCircleOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';

function UserUpdatePage() {
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
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <Badge
          offset={[-10, 55]}
          count={<EditOutlined style={{ fontSize: 20, marginRight: '-22' }} />}
        >
          <Avatar size={64} icon={<UserOutlined />} />
        </Badge>
      </div>
      <UserInfoUpdate />
    </div>
  );
}

export default UserUpdatePage;
