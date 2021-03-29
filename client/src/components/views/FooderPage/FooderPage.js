import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Badge, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { fetchUserReview } from '../../../_api/Review';
import { fetchUserFollow, fetchUserFollowing } from '../../../_api/User';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import FooderReviewItems from './Sections/FooderReviewItems';
import InfiniteScroll from 'react-infinite-scroll-component';

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '8px',
};

function FooderPage(props) {
  const [userReviewInfo, setuserReviewInfo] = useState([]);
  const [userFollowerInfo, setuserFollowerInfo] = useState([]);
  const [userFollowingInfo, setuserFollowingInfo] = useState([]);
  useEffect(() => {
    const MainData = async () => {
      try {
        // redux에 저장된 user id 사용하기
        const review = await fetchUserReview(props.match.params.userId);
        setuserReviewInfo(review.data);

        const follower = await fetchUserFollow(props.match.params.userId);
        setuserFollowerInfo(follower.data);

        const following = await fetchUserFollowing(props.match.params.userId);
        setuserFollowingInfo(following.data);
      } catch (err) {
        console.log(err);
      }
    };
    MainData();
  }, []);

  const renderReviewCards = userReviewInfo.map((review, index) => {
    return (
      <Col span={12} style={{ marginBottom: '0.3rem' }} key={index}>
        <FooderReviewItems review={review} />
      </Col>
    );
  });

  const renderFollow = () => {
    console.log('???');
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          paddingBottom: '0.5rem',
          paddingTop: '0.5rem',
        }}
      >
        <Row style={rowStyle}>
          <Col>
            <Badge
              offset={[-10, 55]}
              count={
                <EditOutlined style={{ fontSize: 20, marginRight: '-22' }} />
              }
            >
              <Avatar size={64} icon={<UserOutlined />} />
            </Badge>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col>
            <span>{props.location.state.username}</span>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center', paddingBottom: '0.5rem' }}>
          {/* 팔로우 되어있는지 아닌지 확인 해야함 */}
          <Button
            type="danger"
            shape="round"
            size={'small'}
            onClick={renderFollow}
          >
            팔로우
          </Button>
        </Row>
        <Row className="mypagetag" style={{ textAlign: 'center' }}>
          <Col span={8}>
            <span>리뷰</span>
            <br />
            <span>{userReviewInfo.length}</span>
          </Col>
          <Col span={8}>
            <NavLink
              to="/follow"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              팔로우
            </NavLink>
            <br />
            <span>{userFollowerInfo.length}</span>
          </Col>
          <Col span={8}>
            팔로잉
            <br />
            <span>{userFollowingInfo.length}</span>
          </Col>
        </Row>
      </div>
      <div style={{ margin: '0.8rem' }}>
        <div
          style={{
            height: '390px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <InfiniteScroll dataLength={userReviewInfo.length}>
            <Row gutter={5}>{renderReviewCards}</Row>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default FooderPage;
