import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Avatar, Badge, Button, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Card } from 'react-bootstrap';
import { logoutUser } from '../../../_actions/user_actions';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import ReviewCard from '../../../utils/ReviewCard';
import Diary from './Sections/Diary';
import { fetchUserReview } from '../../../_api/Review';
import InfiniteScroll from 'react-infinite-scroll-component';

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
};

function MyPage(props) {
  const dispatch = useDispatch();
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

  const [myReview, setmyReview] = useState([]);
  const [myReviewDetail, setmyReviewDetail] = useState([]);

  useEffect(() => {
    fetchUserReview(props.user.loginSuccess.id).then(res => {
      setmyReview(res.data);
    });
  }, []);

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

  const renderReviewCards = myReview.map((review, index) => {
    return <ReviewCard review={review} key={index} />;
  });

  const renderLogout = () => {
    window.localStorage.removeItem('token');
    // redux 로 지워줘야함
    dispatch(logoutUser());
    props.history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={renderLogout}>로그아웃</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          paddingBottom: '1rem',
          paddingTop: '0.5rem',
        }}
      >
        <div
          style={{
            paddingRight: '0.5rem',
            textAlign: 'right',
            fontSize: '20px',
          }}
        >
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <BiDotsVerticalRounded />
            </a>
          </Dropdown>
        </div>

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
            {showDiaryPage && <Diary review={myReview} />}
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
                  {renderReviewCards}
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
