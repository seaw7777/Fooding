import React, { useState } from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';

function FollowList() {
  const [followList, setfollowList] = useState([
    '예림',
    '주이',
    '희은',
    '현철',
    '준오',
  ]);

  const renderFollowList = () =>
    followList.map((follow, index) => (
      <Row style={{ marginBottom: '1rem' }}>
        <Col>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
        <Col
          span={18}
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          {follow}
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

export default FollowList;
