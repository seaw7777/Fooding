import React, { useState } from 'react';
import { Button } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import FollowList from './Sections/FollowList';
import FollowingList from './Sections/FollowingList';

function FollowPage() {
  const [showFollowList, setshowFollowList] = useState(true);
  const [showFollowingList, setshowFollowingList] = useState(false);

  const showFollowListButton = () => {
    setshowFollowList(true);
    setshowFollowingList(false);
  };

  const showFollowingListButton = () => {
    setshowFollowList(false);
    setshowFollowingList(true);
  };

  return (
    <div style={{ margin: '2rem' }}>
      <div
        style={{
          fontSize: '18px',
          borderBottom: 'solid grey',
          paddingBottom: '15px',
        }}
      >
        <LeftCircleOutlined style={{ fontSize: '25px', marginRight: '10px' }} />
        팔로우 관리
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button
          type="primary"
          shape="round"
          size={'small'}
          style={{ marginRight: '10px' }}
          onClick={showFollowListButton}
        >
          팔로우
        </Button>
        <Button
          type="primary"
          shape="round"
          size={'small'}
          onClick={showFollowingListButton}
        >
          팔로잉
        </Button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        {showFollowList && <FollowList />}
        {showFollowingList && <FollowingList />}
      </div>
    </div>
  );
}

export default FollowPage;
