import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Badge, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Card } from 'react-bootstrap';
import { fetchUserReview } from '../../../_api/Review';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import FooderReviewItems from './Sections/FooderReviewItems';
import InfiniteScroll from 'react-infinite-scroll-component';

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
};

function FooderPage(props) {
  const [userReviewInfo, setuserReviewInfo] = useState([]);

  useEffect(() => {
    fetchUserReview(props.match.params.userId).then(res => {
      setuserReviewInfo(res.data);
    });
  }, []);

  const renderReviewCards = userReviewInfo.map((review, index) => {
    return (
      <Col span={12}>
        <FooderReviewItems review={review} />
      </Col>
    );
  });

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          paddingBottom: '1rem',
          paddingTop: '2rem',
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
              <a
                href="/mypage/update"
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <Avatar size={64} icon={<UserOutlined />} />
              </a>
            </Badge>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col>
            <span>{props.location.state.username}</span>
          </Col>
        </Row>
        <Row className="mypagetag" style={{ textAlign: 'center' }}>
          <Col span={8}>
            {/* row 추가해야할 듯 */}
            <span>리뷰</span>
          </Col>
          <Col span={8}>
            <NavLink
              to="/follow"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              팔로우
            </NavLink>
          </Col>
          <Col span={8}>
            <a
              href="/mypage/spoon"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              스푼
            </a>
          </Col>
        </Row>
      </div>
      <div>
        <Row>{renderReviewCards}</Row>
      </div>
    </div>
  );
}

export default FooderPage;
