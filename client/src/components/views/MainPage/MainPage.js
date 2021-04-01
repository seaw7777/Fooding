import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import MainPageBar from './Sections/MainPageBar';
import RecommendFooder from './Sections/RecommendFooder';
import StoreCard from 'utils/StoreCard';
import { fetchStoresMainPage, StoreRecommendInfo } from '_api/Stores';
import { fetchInfluencer } from '_api/Recommend';
import InfiniteScroll from 'react-infinite-scroll-component';
import { changeUserInfo } from '../../../_actions/user_actions';
import { FcFlashOn } from 'react-icons/fc';
const { kakao } = window;

function MainPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [Address, setAddress] = useState(''); //초기에 입력한 주소 받아와서 할당하기
  const [Fooders, setFooders] = useState([]);
  const [Stores, setStores] = useState([]);
  const { Title, Text } = Typography;

  useEffect(() => {
    const MainData = async () => {
      try {
        // redux에 저장된 user id 사용하기
        const response = await fetchInfluencer('1');
        setFooders(response.data);

        const res = await fetchStoresMainPage();
        setStores(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    MainData();
    // setAddress(props.user.loginSuccess.address);
  }, []);

  useEffect(() => {
    setAddress(props.user.loginSuccess.address);
  });

  const handlerAddress = (ad, lat, lng, region_name) => {
    setAddress(ad);
    dispatch(changeUserInfo(ad));
    // list
    // 주소를 한꺼번에 말고 나눠서 보내기
    const body = {
      user_id: props.user.loginSuccess.id,
      lat: lat,
      lng: lng,
      address: ad,
      region_name: region_name,
    };
    StoreRecommendInfo(body)
      .then(res => {
        console.log('???????');
        console.log(res.data);
        setStores(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderStoreCard = Stores.map((store, index) => {
    return <StoreCard store={store} key={index} />;
  });
  return (
    <div>
      <MainPageBar change={handlerAddress} address={Address} />
      <div style={{ margin: '1rem' }}>
        <Title level={4}>
          뜨고 있는 인기 FOODER
          <FcFlashOn />
        </Title>
      </div>
      <div
        style={{
          height: 480,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <InfiniteScroll dataLength={'10'}>
          <RecommendFooder list={Fooders} />
          {renderStoreCard}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default MainPage;
