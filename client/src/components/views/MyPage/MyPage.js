import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Avatar, Badge, Button, Dropdown, Menu } from 'antd';
import { Tabs, Tab } from 'react-bootstrap';
import { logoutUser } from '../../../_actions/user_actions';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import { EditOutlined } from '@ant-design/icons';
import ReviewCard from '../../../utils/ReviewCard';
import Diary from './Sections/Diary';
import Grade from '../../../utils/Grade';
import { fetchUserReview } from '../../../_api/Review';
import {
  fetchUserFollow,
  fetchUserFollowing,
  fetchMyLikePlace,
} from '../../../_api/User';
import StoreCard from '../../../utils/StoreCard';
import InfiniteScroll from 'react-infinite-scroll-component';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Sections/Mypage.css';

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '7px',
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
  const [userFollowerInfo, setuserFollowerInfo] = useState([]);
  const [userFollowingInfo, setuserFollowingInfo] = useState([]);
  const [userLikePlace, setuserLikePlace] = useState([]);
  const [imageUrl, setimageUrl] = useState('');

  useEffect(() => {
    const MainData = async () => {
      try {
        const review = await fetchUserReview(props.user.loginSuccess.id);
        let reviews = review.data.sort(
          (a, b) => Date.parse(b.write_date) - Date.parse(a.write_date),
        );
        setmyReview(reviews);

        const follower = await fetchUserFollow(props.user.loginSuccess.id);
        setuserFollowerInfo(follower.data);

        const following = await fetchUserFollowing(props.user.loginSuccess.id);
        setuserFollowingInfo(following.data);

        const likePlace = await fetchMyLikePlace(props.user.loginSuccess.id);
        setuserLikePlace(likePlace.data);
        console.log(likePlace.data);
      } catch (err) {
        console.log(err);
      }
    };
    MainData();
    setimageUrl(
      `https://j4d107.p.ssafy.io/media/user/${props.user.loginSuccess.id}_profile.png`,
    );
  }, []);
  const renderImageUrl = () => {
    setimageUrl('/images/basicUser.png');
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

  const renderReviewCards = myReview.map((review, index) => {
    return <ReviewCard review={review} key={index} />;
  });

  const onRemove = id => {
    setuserLikePlace(userLikePlace.filter(store => store.id != id));
  };

  const renderLikePlace = userLikePlace.map((store, index) => {
    return (
      <StoreCard
        store={store}
        key={index}
        like={true}
        user={props.user.loginSuccess.id}
        onRemove={onRemove}
      />
    );
  });

  const renderLogout = () => {
    window.localStorage.removeItem('token');
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
          paddingBottom: '0.4rem',
          paddingTop: '0.2rem',
        }}
      >
        <div
          style={{
            paddingRight: '0.5rem',
            textAlign: 'right',
            fontSize: '18px',
          }}
        >
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              style={{ color: 'black', textDecoration: 'none' }}
              className="ant-dropdown-link"
              onClick={e => e.preventDefault()}
            >
              <BiDotsVerticalRounded />
            </a>
          </Dropdown>
        </div>

        <Row style={rowStyle}>
          <Col>
            <Badge
              offset={[-10, 46]}
              count={<EditOutlined style={{ fontSize: 15 }} />}
            >
              <a
                href="/mypage/update"
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <Avatar
                  size={50}
                  src={
                    <img src={imageUrl} alt="없음" onError={renderImageUrl} />
                  }
                />
              </a>
            </Badge>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col style={{ display: 'flex' }}>
            <Grade
              style={{ display: 'inline' }}
              grade={props.user.loginSuccess.grade}
            />
            <span style={{ marginLeft: '0.3rem' }}>
              {props.user.loginSuccess.nickname}
            </span>
          </Col>
        </Row>
        <Row
          className="mypagetag"
          style={{ textAlign: 'center', fontSize: '15px' }}
        >
          <Col span={6}>
            <span>리뷰</span>
            <br />
            <span>{myReview.length}</span>
          </Col>
          <Col span={6}>
            <Link
              to={{
                pathname: '/follow',
                state: {
                  followButton: true,
                  followingButton: false,
                  userId: props.user.loginSuccess.id,
                },
              }}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              팔로우
            </Link>
            <br />
            <span>{userFollowerInfo.length}</span>
          </Col>
          <Col span={6}>
            <Link
              to={{
                pathname: '/follow',
                state: {
                  followButton: false,
                  followingButton: true,
                  userId: props.user.loginSuccess.id,
                },
              }}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              팔로잉
            </Link>
            <br />
            <span>{userFollowingInfo.length}</span>
          </Col>
          <Col span={6}>
            <a
              href="/mypage/spoon"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              스푼
            </a>
            <br />
            <span>{props.user.loginSuccess.spoon_cnt}</span>
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
            <Row style={{ marginTop: '1rem', marginBottom: '0.6rem' }}>
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
              <Col span={6} offset={(6, 0)} className="review-btn">
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
                  height: document.body.clientHeight - 390,
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
          <Tab eventKey="likePlace" title="찜한 장소">
            <div
              style={{
                height: document.body.clientHeight - 342,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <InfiniteScroll dataLength={userLikePlace.length}>
                {renderLikePlace}
              </InfiniteScroll>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
