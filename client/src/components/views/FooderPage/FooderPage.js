import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Badge, Button } from 'antd';
import { BsCheck } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { fetchUserReview } from '../../../_api/Review';
import { Link } from 'react-router-dom';
import {
  fetchUserFollowCheck,
  fetchUserFollow,
  fetchUserFollowing,
  fetchDeleteUserFollow,
  fetchMakeUserFollow,
} from '../../../_api/User';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Grade from '../../../utils/Grade';
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
  const [followCheck, setfollowCheck] = useState(false);
  const [imageUrl, setimageUrl] = useState('');
  useEffect(() => {
    const MainData = async () => {
      try {
        const followCheck = await fetchUserFollowCheck(
          props.user.loginSuccess.id,
          props.match.params.userId,
        );
        setfollowCheck(true);
      } catch (err) {
        setfollowCheck(false);
      }
      try {
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
    setimageUrl(
      `http://j4d107.p.ssafy.io:8000/media/user/${props.match.params.userId}_profile.png`,
    );
  }, [followCheck]);
  const renderImageUrl = () => {
    setimageUrl('/images/basicUser.png');
  };

  const renderReviewCards = userReviewInfo.map((review, index) => {
    return (
      <Col span={12} style={{ marginBottom: '0.3rem' }} key={index}>
        <FooderReviewItems review={review} />
      </Col>
    );
  });

  const renderDeleteFollow = () => {
    fetchDeleteUserFollow(props.user.loginSuccess.id, props.match.params.userId)
      .then(res => {
        console.log(res);
        setfollowCheck(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderMakeFollow = () => {
    fetchMakeUserFollow(props.user.loginSuccess.id, props.match.params.userId)
      .then(res => {
        console.log(res);
        setfollowCheck(true);
      })
      .catch(err => {
        console.log(err);
      });
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
            <Avatar
              size={64}
              src={<img src={imageUrl} alt="없음" onError={renderImageUrl} />}
            />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col style={{ display: 'flex' }}>
            <Grade
              style={{ display: 'inline' }}
              grade={props.location.state.grade}
            />
            <span style={{ marginLeft: '0.3rem' }}>
              {props.location.state.username}
            </span>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center', paddingBottom: '0.5rem' }}>
          {followCheck ? (
            <Button
              style={{ color: 'red', borderColor: 'red' }}
              shape="round"
              size={'small'}
              onClick={renderDeleteFollow}
            >
              팔로잉
              <BsCheck />
            </Button>
          ) : (
            <Button
              type="danger"
              shape="round"
              size={'small'}
              onClick={renderMakeFollow}
            >
              팔로우
            </Button>
          )}
        </Row>
        <Row className="mypagetag" style={{ textAlign: 'center' }}>
          <Col span={8}>
            <span>리뷰</span>
            <br />
            <span>{userReviewInfo.length}</span>
          </Col>
          <Col span={8}>
            <Link
              to={{
                pathname: '/follow',
                state: {
                  followButton: true,
                  followingButton: false,
                  userId: props.match.params.userId,
                },
              }}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              팔로우
            </Link>
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
