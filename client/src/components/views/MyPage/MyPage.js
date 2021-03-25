import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Badge, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Diary from './Sections/Diary';
import ReviewCard from '../../../utils/ReviewCard';
import axios from 'axios';
import { SERVER } from '../../../Config';
import InfiniteScroll from 'react-infinite-scroll-component';

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
};

function MyPage(props) {
  const [showDiaryPage, setshowDiaryPage] = useState(true);
  const [showReviewCardPage, setshowReviewCardPage] = useState(false);
  const [diaryButtonStyle, setdiaryButtonStyle] = useState({
    backgroundColor: '#faad14',
    borderColor: '#faad14',
  });
  const [detailButtonStyle, setdetailButtonStyle] = useState({
    color: '#faad14',
    borderColor: '#faad14',
  });
  const [myReview, setmyReview] = useState();

  useEffect(() => {
    axios
      .get(`${SERVER}reviews/reviewInfo/${props.user.loginSuccess.id}`)
      .then(res => {
        setmyReview(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const renderReviewCards = review => {
    axios.get(`${SERVER}stores/detail/${review.store_id}/`).then(res => {
      console.log(res.data);
    });
  };

  const showDiaryPageButton = () => {
    setshowDiaryPage(true);
    setshowReviewCardPage(false);
    setdiaryButtonStyle({
      backgroundColor: '#faad14',
      borderColor: '#faad14',
    });
    setdetailButtonStyle({ color: '#faad14', borderColor: '#faad14' });
  };

  const showReviewCardPageButton = () => {
    setshowDiaryPage(false);
    setshowReviewCardPage(true);
    setdiaryButtonStyle({
      color: '#faad14',
      borderColor: '#faad14',
      backgroundColor: 'white',
    });
    setdetailButtonStyle({
      color: 'white',
      backgroundColor: '#faad14',
      borderColor: '#faad14',
    });
  };
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
            <span>{props.user.loginSuccess.nickname}</span>
          </Col>
        </Row>
        <Row className="mypagetag" style={{ textAlign: 'center' }}>
          <Col span={6}>
            {/* row 추가해야할 듯 */}
            <span>리뷰</span>
          </Col>
          <Col span={6}>
            <NavLink
              to="/follow"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              팔로우
            </NavLink>
          </Col>
          <Col span={6}>
            <span>팔로잉</span>
          </Col>
          <Col span={6}>
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
        <Tabs
          className="myTabs"
          fill
          defaultActiveKey="review"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="review" title="리뷰">
            <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <Col span={6} offset={(0, 6)}>
                <Button
                  type="primary"
                  style={diaryButtonStyle}
                  shape="round"
                  size={'small'}
                  onClick={showDiaryPageButton}
                >
                  다이어리
                </Button>
              </Col>
              <Col span={6} offset={(6, 0)}>
                <Button
                  style={detailButtonStyle}
                  shape="round"
                  size={'small'}
                  onClick={showReviewCardPageButton}
                >
                  리뷰 상세
                </Button>
              </Col>
            </Row>
            {showDiaryPage && <Diary />}
            {showReviewCardPage && (
              <div
                style={{
                  height: 327,
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <InfiniteScroll dataLength={myReview.length}>
                  {myReview.map((review, index) => {
                    {
                      renderReviewCards(review);
                    }
                  })}
                </InfiniteScroll>
              </div>
            )}
          </Tab>
          <Tab eventKey="likePlace" title="찜한 장소"></Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyPage;
