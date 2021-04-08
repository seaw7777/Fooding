import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import MainPageBar from './Sections/MainPageBar';
import RecommendFooder from './Sections/RecommendFooder';
import StoreCard from 'utils/StoreCard';
import { ChangeUserAddress } from '_api/Stores';
import { fetchInfluencer, fetchRecommendStore } from '_api/Recommend';
import InfiniteScroll from 'react-infinite-scroll-component';
import { changeUserInfo } from '../../../_actions/user_actions';
import { FcFlashOn } from 'react-icons/fc';
const { kakao } = window;

function MainPage(props) {
  const dispatch = useDispatch();
  const [Address, setAddress] = useState(''); //초기에 입력한 주소 받아와서 할당하기
  const [Fooders, setFooders] = useState([]);
  const [Stores, setStores] = useState([]);
  const { Title } = Typography;
  useEffect(() => {
    const MainData = async () => {
      try {
        const response = await fetchInfluencer(props.user.loginSuccess.id);
        setFooders(response.data);

        const res = await fetchRecommendStore(props.user.loginSuccess.id);
        setStores(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    MainData();
  }, []);

  useEffect(() => {
    setAddress(props.user.loginSuccess.address);
  });

  const handlerAddress = (ad, lat, lng, region_name) => {
    setAddress(ad);
    dispatch(changeUserInfo(ad));
    const body = {
      user_id: props.user.loginSuccess.id,
      lat: lat,
      lng: lng,
      address: ad,
      region_name: region_name,
    };
    ChangeUserAddress(body)
      .then(res => {
        console.log(res.data);
        window.location.replace('/main');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRemove = id => {
    setStores(Stores.filter(store => store.id != id));
  };

  const renderStoreCard = Stores.map((store, index) => {
    return (
      <StoreCard
        store={store}
        key={index}
        user={props.user.loginSuccess.id}
        onRemove={onRemove}
      />
    );
  });
  return (
    <div>
      <MainPageBar change={handlerAddress} address={Address} />
      <div
        style={{
          height: document.body.clientHeight - 161,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title level={4} style={{ margin: '0.5rem' }}>
          뜨고 있는 인기 FOODER
          <FcFlashOn />
        </Title>

        <InfiniteScroll dataLength={'10'} style={{ width: '420' }}>
          <RecommendFooder list={Fooders} />
          <Title level={4} style={{ textAlign: 'center', marginTop: '1rem' }}>
            맛집 추천
            <FcFlashOn />
          </Title>
          {Stores === [] ? console.log('y') : renderStoreCard}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default MainPage;
