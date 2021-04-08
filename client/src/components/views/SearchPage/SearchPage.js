import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FooderList from './Sections/FooderList';
import StoreCard from 'utils/StoreCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchSearchStore, fetchSearchFooder } from '_api/Search';
import './Sections/SearchPage.css';

function SearchPage(props) {
  const userId = props.user.loginSuccess.id;
  const [SearchValue, setSearchValue] = useState('');
  const [InputValue, setInputValue] = useState('푸더의 이름을 검색해주세요.');
  const [Stores, setStores] = useState([]);
  const [Fooders, setFooders] = useState([]);
  const [showFooderPage, setshowFooderPage] = useState(true);
  const [showStoreCardPage, setshowStoreCardPage] = useState(false);
  const [FooderButtonStyle, setFooderButtonStyle] = useState({
    backgroundColor: '#faad14',
    borderColor: '#faad14',
  });
  const [StoreListButtonStyle, setStoreListButtonStyle] = useState({
    borderColor: '#faad14',
    backgroundColor: 'white',
    color: '#faad14',
  });
  const [FollowingList, setFollowingList] = useState([]);
  useEffect(() => {
    fetchSearchFooder(userId)
      .then(res => setFooders(res.data))
      .catch(err => console.log(err));
  }, []);
  const showFooderPageButton = () => {
    let val = 'fooder';
    setSearchValue('');
    showFooderInput(val);
    setshowFooderPage(true);
    setshowStoreCardPage(false);
    setFooderButtonStyle({
      backgroundColor: '#faad14',
      borderColor: '#faad14',
    });
    setStoreListButtonStyle({
      color: '#faad14',
      borderColor: '#faad14',
      backgroundColor: 'white',
    });
  };

  const showStoreCardPageButton = event => {
    let val = 'store';
    setSearchValue('');
    showFooderInput(val);
    setshowFooderPage(false);
    setshowStoreCardPage(true);
    setFooderButtonStyle({
      color: '#faad14',
      borderColor: '#faad14',
      backgroundColor: 'white',
    });
    setStoreListButtonStyle({
      color: 'white',
      backgroundColor: '#faad14',
      borderColor: '#faad14',
    });
  };

  const showFooderInput = val => {
    if (val === 'fooder') {
      setInputValue('푸더의 이름을 검색해주세요.');
    } else {
      setInputValue('가게 이름을 검색해주세요.');
    }
  };

  const renderStoreCard = () => {
    return (
      <div
        style={{
          height: document.body.clientHeight - 255,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <InfiniteScroll dataLength={Stores.length}>
          {Stores.map((store, index) => (
            <StoreCard store={store} />
          ))}
        </InfiniteScroll>
      </div>
    );
  };

  const EnterSearchKeyword = event => {
    if (InputValue === '가게 이름을 검색해주세요.') {
      fetchSearchStore(SearchValue)
        .then(res => {
          setStores(res.data);
        })
        .catch(err => console.log(err));
      setSearchValue('');
      return <Input value="" />;
    } else if (InputValue === '푸더의 이름을 검색해주세요.') {
      const find = Fooders.filter(
        fooder =>
          fooder.nickname.includes(SearchValue) ||
          fooder.nickname.toLowerCase().includes(SearchValue),
      );
      setFollowingList(find);
      setSearchValue('');
    }
  };

  const handleSearchValue = event => {
    let keyword = event.currentTarget.value;
    if (event.key !== 'Enter' && InputValue === '가게 이름을 검색해주세요.') {
      setSearchValue(keyword);
    } else if (
      event.key !== 'Enter' &&
      InputValue === '푸더의 이름을 검색해주세요.'
    ) {
      setSearchValue(keyword);
    }
  };

  return (
    <div>
      <div
        style={{
          height: '100px',
          backgroundColor: '#ffd666',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          id="input"
          placeholder={InputValue}
          onChange={handleSearchValue}
          onPressEnter={EnterSearchKeyword}
          value={SearchValue}
          shape="round"
          style={{
            height: '50px',
            width: '85%',
          }}
          prefix={<SearchOutlined />}
        />
      </div>
      <Row style={{ marginTop: '1rem' }}>
        <Col span={6} offset={(0, 6)}>
          <Button
            type="primary"
            shape="round"
            size="small"
            id="fooder"
            onClick={showFooderPageButton}
            style={FooderButtonStyle}
          >
            Fooder
          </Button>
        </Col>
        <Col span={6} offset={(6, 0)}>
          <Button
            type="primary"
            shape="round"
            size="small"
            onClick={showStoreCardPageButton}
            style={StoreListButtonStyle}
          >
            가게이름
          </Button>
        </Col>
      </Row>
      {showFooderPage && <FooderList followingList={FollowingList} />}
      {showStoreCardPage && renderStoreCard()}
    </div>
  );
}

export default SearchPage;
