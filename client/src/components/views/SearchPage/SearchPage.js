import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { ContainerFilled, SearchOutlined } from '@ant-design/icons';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import FooderList from './Sections/FooderList';
import StoreList from './Sections/StoreList';

function SearchPage() {
  const [InputValue, setInputValue] = useState('푸더의 이름을 검색해주세요.');
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

  const showStoreCardPageButton = () => {
    let val = 'store';
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
      setInputValue('푸더의 이름을 입력해주세요.');
    } else {
      setInputValue('가게 이름을 입력해주세요');
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
          size="large"
          placeholder={InputValue}
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
      {showStoreCardPage && <StoreList />}
    </div>
  );
}

export default SearchPage;
