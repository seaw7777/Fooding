import React, { useState, useEffect } from 'react';
import { Button, DatePicker, version, Typography } from 'antd';
import MainPageBar from './Sections/MainPageBar';
import RecommendFooder from './Sections/RecommendFooder';
import StoreCard from 'utils/StoreCard';

function MainPage() {
  const [Address, setAddress] = useState(''); //초기에 입력한 주소 받아와서 할당하기
  const { Title, Text } = Typography;

  useEffect(() => {
    let newAddress = '구미 진평동';
    setAddress(newAddress);
  }, []);
  return (
    <div>
      <MainPageBar address={Address} />
      <div>
        <Title level={4}>뜨고 있는 인기 푸더!!</Title>
        <Text strong>이 지역 인기 푸더를 팔로잉하고 소식을 받아보세요!</Text>
        <RecommendFooder />
      </div>
      <StoreCard />
    </div>
  );
}

export default MainPage;
