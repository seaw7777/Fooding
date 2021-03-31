import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import MainPageBar from './Sections/MainPageBar';
import RecommendFooder from './Sections/RecommendFooder';
import StoreCard from 'utils/StoreCard';
import { fetchStoresMainPage, StoreRecommendInfo } from '_api/Stores';
import { fetchInfluencer } from '_api/Main';
import InfiniteScroll from 'react-infinite-scroll-component';
import { changeUserInfo } from '../../../_actions/user_actions';

const { kakao } = window;

function MainPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [Address, setAddress] = useState(''); //초기에 입력한 주소 받아와서 할당하기
  const [Fooders, setFooders] = useState([]);
  const [Stores, setStores] = useState([]);
  const { Title, Text } = Typography;

  useEffect(() => {
    setAddress(props.user.loginSuccess.address);
  });

  //   useEffect(() => {
  //     var geocoder = new kakao.maps.services.Geocoder();
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(function (position) {
  //         setlan(position.coords.latitude); // 위도
  //         setlng(position.coords.longitude); // 경도
  //       });
  //     }
  //     var coord = new kakao.maps.LatLng(lan, lng);
  //     geocoder.coord2Address(
  //       coord.getLng(),
  //       coord.getLat(),
  //       function (result, status) {
  //         if (status === kakao.maps.services.Status.OK) {
  //           setAddress(result[0].address.address_name);
  //           console.log(result);
  //         }
  //       },
  //     );
  //   }, []);

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
  }, []);

  const handlerAddress = (ad, lat, lng) => {
    setAddress(ad);
    dispatch(changeUserInfo(ad));
    console.log('!!!!!!!!');
    const recommend = StoreRecommendInfo({
      user_id: props.user.loginSuccess.id,
      lat: lat,
      lng: lng,
      address: ad,
    });
    console.log(recommend);
    // 새로운 주소에 맞게끔, user_id, 위도, 경도, 주소 다 보내줘야함
  };

  const renderStoreCard = Stores.map((store, index) => {
    return <StoreCard store={store} key={index} />;
  });
  return (
    <div>
      <MainPageBar change={handlerAddress} address={Address} />
      <div>
        <Title level={4}>뜨고 있는 인기 푸더!!</Title>
        <Text strong>인기 푸더를 팔로잉하고 소식을 받아보세요!</Text>
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
