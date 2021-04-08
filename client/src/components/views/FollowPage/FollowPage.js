import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import FollowList from './Sections/FollowList';
import FollowingList from './Sections/FollowingList';
import axios from 'axios';
import { SERVER } from '../../../Config.js';
import InfiniteScroll from 'react-infinite-scroll-component';

function FollowPage(props) {
  const [followList, setfollowList] = useState([]);
  const [followingList, setfollowingList] = useState([]);
  const [followButtonStyle, setfollowButtonStyle] = useState({});
  const [followingButtonStyle, setfollowingButtonStyle] = useState({});
  const [showFollowList, setshowFollowList] = useState(
    props.location.state.followButton,
  );
  const [showFollowingList, setshowFollowingList] = useState(
    props.location.state.followingButton,
  );
  useEffect(() => {
    if (props.location.state.userId) {
      axios
        .get(`${SERVER}accounts/followerInfo/${props.location.state.userId}`)
        .then(res => {
          setfollowList(res.data);
        })
        .catch(err => console.log(err));

      axios
        .get(`${SERVER}accounts/followingInfo/${props.location.state.userId}`)
        .then(res => {
          setfollowingList(res.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (props.location.state.followButton) {
      setfollowButtonStyle({
        color: 'white',
        backgroundColor: '#faad14',
        borderColor: '#faad14',
      });
      setfollowingButtonStyle({
        color: '#faad14',
        backgroundColor: 'white',
        borderColor: '#faad14',
        // borderColor: '#faad14',
        // backgroundColor: 'white',
      });
    } else {
      setfollowButtonStyle({
        color: '#faad14',
        backgroundColor: 'white',
        borderColor: '#faad14',
      });

      setfollowingButtonStyle({
        color: 'white',
        backgroundColor: '#faad14',
        borderColor: '#faad14',
      });
    }
  }, []);

  const showFollowListButton = () => {
    setshowFollowList(true);
    setshowFollowingList(false);
    setfollowButtonStyle({
      color: 'white',
      backgroundColor: '#faad14',
      borderColor: '#faad14',
    });
    setfollowingButtonStyle({
      color: '#faad14',
      backgroundColor: 'white',
      borderColor: '#faad14',
      // borderColor: '#faad14',
      // backgroundColor: 'white',
    });
  };

  const showFollowingListButton = () => {
    setshowFollowList(false);
    setshowFollowingList(true);
    setfollowButtonStyle({
      color: '#faad14',
      backgroundColor: 'white',
      borderColor: '#faad14',
    });

    setfollowingButtonStyle({
      color: 'white',
      backgroundColor: '#faad14',
      borderColor: '#faad14',
    });
  };

  return (
    <div style={{ margin: '2rem' }}>
      <div
        style={{
          fontSize: '18px',
          borderBottom: 'solid grey',
          paddingBottom: '15px',
        }}
      >
        <a href="/mypage" style={{ textDecoration: 'none', color: 'grey' }}>
          <LeftCircleOutlined
            style={{ fontSize: '25px', marginRight: '10px' }}
          />
        </a>
        팔로우/ 팔로잉 관리
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button
          type="primary"
          shape="round"
          size={'small'}
          style={followButtonStyle}
          onClick={showFollowListButton}
        >
          팔로우
        </Button>
        <div style={{ display: 'inline', marginLeft: '0.5rem' }}>
          <Button
            type="primary"
            shape="round"
            size={'small'}
            onClick={showFollowingListButton}
            style={followingButtonStyle}
          >
            팔로잉
          </Button>
        </div>
      </div>
      <div
        style={{
          marginTop: '1rem',
          height: 450,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InfiniteScroll dataLength={'10'} style={{ width: '420' }}>
          {showFollowList && <FollowList followList={followList} />}
          {showFollowingList && <FollowingList followingList={followingList} />}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default FollowPage;
