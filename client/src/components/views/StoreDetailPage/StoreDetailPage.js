import React, { useState } from 'react';
import ImageSlider from 'utils/ImageSlider';
import StoreMap from './Sections/StoreMap';
import ReviewCard from 'utils/ReviewCard';
import { Typography } from 'antd';
import { StarFilled, PhoneFilled, CompassTwoTone } from '@ant-design/icons';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sections/StoreDetailPage.css';

function StoreDetailPage() {
  const [Images, setImages] = useState([1, 2]);
  const { Title, Text } = Typography;

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

        <div>
          <Tabs className="myClass" fill defaultActiveKey="storeMap">
            <Tab eventKey="storeMap" title="지도">
              <StoreMap></StoreMap>
            </Tab>
            <Tab eventKey="storeReview" title="리뷰">
              <ReviewCard></ReviewCard>
            </Tab>
            <Tab eventKey="storeMenu" title="메뉴"></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StoreDetailPage;
