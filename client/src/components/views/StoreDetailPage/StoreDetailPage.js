import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from 'utils/ImageSlider';
import StoreMap from './Sections/StoreMap';
import ReviewCard from 'utils/ReviewCard';
import { Typography } from 'antd';
import { StarFilled, PhoneFilled, CompassTwoTone } from '@ant-design/icons';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sections/StoreDetailPage.css';
import { StoreDetailInfo } from '_api/Stores';

function StoreDetailPage(props) {
  const [Images, setImages] = useState([1, 2]);
  const { Title, Text } = Typography;
  const [StoreInfo, setStoreInfo] = useState([]);
  const storeId = props.match.params.StoreId;
  // const { StoreId } = useParams();
  // console.log(useParams());
  const [StoreLocation, setStoreLocation] = useState([]);

  useEffect(() => {
    const StoreInfo = async () => {
      try {
        const response = await StoreDetailInfo('2');
        console.log(response.data);
        setStoreInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    StoreInfo();
  }, []);

  const StoreLocationInfo = () => {
    let storeLatLng = [];
    storeLatLng.push(StoreInfo.lat);
    storeLatLng.push(StoreInfo.lng);
    setStoreLocation(storeLatLng);
    console.log(StoreLocation);
  };
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
            <Title level={4}>{StoreInfo.store_name}</Title>
            <Text>{StoreInfo.review_cnt}</Text>
          </div>
          <Text mark>{StoreInfo.main_category}</Text>
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
          <Text>{StoreInfo.tel}</Text>
          <br />
          <CompassTwoTone />
          <Text>{StoreInfo.address}</Text>
        </div>

        <div>
          <Tabs className="myClass" fill defaultActiveKey="storeMap">
            <Tab eventKey="storeMap" title="지도">
              <StoreMap
                MapInfo={{ lng: StoreInfo.lng, lat: StoreInfo.lat }}
              ></StoreMap>
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
