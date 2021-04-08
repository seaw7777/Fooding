import React from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function FollowList(props) {
  return (
    <div>
      {props.followList.map((follow, index) => (
        <Row style={{ marginBottom: '1rem' }} key={index}>
          <Col>
            <Avatar size="large" icon={<UserOutlined />} />
          </Col>
          <Col
            span={18}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1rem',
            }}
          >
            <Link
              to={{
                pathname: `/fooder/${follow.id}`,
                state: {
                  username: follow.nickname,
                  spoon_cnt: follow.spoon_cnt,
                  grade: follow.grade,
                },
              }}
              style={{ color: 'black' }}
            >
              {follow.nickname}
            </Link>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <CloseCircleOutlined style={{ fontSize: '20px' }} />
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default FollowList;
