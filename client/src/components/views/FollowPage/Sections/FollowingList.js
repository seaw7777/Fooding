import React, { useState } from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';

function FollowingList(props) {
  const renderFollowList = () =>
    props.followingList.map((follow, index) => (
      <Row style={{ marginBottom: '1rem' }} key={index}>
        <Col>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
        <Col
          span={18}
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          {follow.nickname}
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <CloseCircleOutlined style={{ fontSize: '20px' }} />
        </Col>
      </Row>
    ));
  return (
    <div>
      <>{renderFollowList()}</>
    </div>
  );
}

export default FollowingList;
