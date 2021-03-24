import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import MainPageBar from './Sections/MainPageBar';
import RecommendFooder from './Sections/RecommendFooder';
import StoreCard from 'utils/StoreCard';
import { fetchStoresMainPage } from '_api/Stores';
import { fetchInfluencer } from '_api/Main';
import InfiniteScroll from 'react-infinite-scroll-component';

function MainPage(props) {
  const user = useSelector(state => state.user);
  const [Address, setAddress] = useState(''); //초기에 입력한 주소 받아와서 할당하기
  const [Fooders, setFooders] = useState([]);
  const [Stores, setStores] = useState([]);
  const { Title, Text } = Typography;

  useEffect(() => {
    let newAddress = '구미 진평동';
    setAddress(newAddress);

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
  }, []);

  const renderStoreCard = Stores.map((store, index) => {
    return <StoreCard store={store} />;
  });
  return (
    <div>
      <MainPageBar address={Address} />
      <div>
        <Title level={4}>뜨고 있는 인기 푸더!!</Title>
        <Text strong>이 지역 인기 푸더를 팔로잉하고 소식을 받아보세요!</Text>
      </div>
      <div
        style={{
          height: 500,
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
