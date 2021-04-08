import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar } from 'antd';

function FooderList(props) {
  const defaultProfile = './images/cat.jpg';
  const renderImageUrl = e => {
    e.target.src = defaultProfile;
  };
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
            <Avatar
              size="large"
              src={
                <img
                  src={`https://j4d107.p.ssafy.io/media/user/${follow.id}_profile.png`}
                  alt="없음"
                  onError={renderImageUrl}
                />
              }
            />
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
