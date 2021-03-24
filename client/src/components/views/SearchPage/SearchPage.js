import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import FooderList from './Sections/FooderList';
import StoreList from './Sections/StoreList';

function SearchPage() {
  const [showFooderPage, setshowFooderPage] = useState(true);
  const [showStoreCardPage, setshowStoreCardPage] = useState(false);
  const [FooderButtonStyle, setFooderButtonStyle] = useState({
    backgroundColor: '#faad14',
    borderColor: '#faad14',
  });
  const [StoreListButtonStyle, setStoreListButtonStyle] = useState({
    color: '#faad14',
    borderColor: '#faad14',
  });

  const showFooderPageButton = () => {
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
          placeholder="large size"
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
            onClick={showFooderPageButton}
            style={FooderButtonStyle}
          >
            인플루언서
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
      {showFooderPage && <FooderList />}
      {showStoreCardPage && <StoreList />}
    </div>
  );
}

export default SearchPage;
