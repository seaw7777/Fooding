import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { ContainerFilled, SearchOutlined } from '@ant-design/icons';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import FooderList from './Sections/FooderList';
import StoreCard from 'utils/StoreCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchSearchStore } from '_api/Search';

function SearchPage() {
  const [SearchValue, setSearchValue] = useState('');
  const [InputValue, setInputValue] = useState('푸더의 이름을 검색해주세요.');

  const [Stores, setStores] = useState([
    { store_name: 'abc', review_cnt: 0, id: 2 },
    { store_name: 'def', review_cnt: 0, id: 3 },
    { store_name: 'ghi', review_cnt: 0, id: 4 },
  ]);
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
  const [FollowingList, setFollowingList] = useState([
    { nickname: 'fooder1' },
    { nickname: 'fooder2' },
  ]);

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
    console.log(val);
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
          height: 485,
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
    console.log(event.currentTarget.value);
    console.log(event.key);
    if (InputValue === '가게 이름을 검색해주세요.') {
      console.log('store' + SearchValue);
      fetchSearchStore(SearchValue)
        .then(res => setStores(res.data))
        .catch(err => console.log(err));
      setSearchValue('');
      return <Input value="" />;
    } else if (InputValue === '푸더의 이름을 검색해주세요.') {
      console.log('fooder' + SearchValue);
      setSearchValue('');
    }
  };

  const handleSearchValue = event => {
    let keyword = event.currentTarget.value;
    console.log(keyword);
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
          style={{ height: '50px', width: '85%' }}
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
