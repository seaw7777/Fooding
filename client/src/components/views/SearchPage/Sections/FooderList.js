import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function FooderList(props) {
  const renderFollowList = () =>
    props.followingList.map((follow, index) => (
      <Link
        to={{
          pathname: `/fooder/${follow.id}`,
          state: {
            username: follow.nickname,
            spoon_cnt: follow.spoon_cnt,
            grade: follow.grade,
          },
        }}
      >
        <Row style={{ margin: '1rem 2.5rem' }} key={index}>
          <Col>
            <Avatar size="large" icon={<UserOutlined />} />
          </Col>
          <Col
            span={18}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1rem',
              color: 'black',
            }}
          >
            {follow.nickname}
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}></Col>
        </Row>
      </Link>
    ));
  return <div>{renderFollowList()}</div>;
}

export default FooderList;
