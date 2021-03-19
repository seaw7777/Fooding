import React, { useState } from 'react';
// import './StoreDetailPage.css';
import ImageSlider from 'utils/ImageSlider';
import StoreMap from './Sections/StoreMap';
import ReviewCard from 'utils/ReviewCard';
import { Typography, Tabs } from 'antd';
import { StarFilled, PhoneFilled, CompassTwoTone } from '@ant-design/icons';

function StoreDetailPage() {
  const [Images, setImages] = useState([1, 2]);
  const { Title, Text } = Typography;
  const { TabPane } = Tabs;

  return (
    <div>
      <ImageSlider images={Images} />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            style={{ borderRadius: '50%', width: '50px' }}
            src={
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            }
          />
          <div>
            <Title level={4}>가게이름</Title>
            <Text>리뷰갯수</Text>
          </div>
          <Text mark>카테고리</Text>
          <StarFilled style={{ fontSize: '50px', color: '#faad14' }} />
        </div>
        <div
          style={{
            border: 'solid 1px #faad14',
            padding: '1rem',
            width: '90%',
            margin: 'auto',
          }}
        >
          <PhoneFilled />
          <Text>전화번호 자리</Text>
          <br />
          <CompassTwoTone />
          <Text>주소자리</Text>
        </div>
        <Tabs
          defaultActiveKey="1"
          centered
          tabBarStyle={{
            backgroundColor: 'orange',
            margin: '1rem',
          }}
        >
          <TabPane tab="지도" key="1" style={{ minheight: 200 }}>
            <StoreMap></StoreMap>
          </TabPane>
          <TabPane tab="리뷰" key="2">
            <ReviewCard></ReviewCard>
          </TabPane>
          <TabPane tab="메뉴" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default StoreDetailPage;
