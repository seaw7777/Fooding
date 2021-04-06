import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import MainPageBar from './Sections/MainPageBar';
import RecommendFooder from './Sections/RecommendFooder';
import StoreCard from 'utils/StoreCard';
import { fetchStoresMainPage, ChangeUserAddress } from '_api/Stores';
import { fetchInfluencer, fetchRecommendStore } from '_api/Recommend';
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
  console.log(document.body.clientWidth);
  console.log(document.body.clientHeight - 95);
  useEffect(() => {
    const MainData = async () => {
      try {
        // redux에 저장된 user id 사용하기
        const response = await fetchInfluencer(props.user.loginSuccess.id);
        setFooders(response.data);

        const res = await fetchRecommendStore(props.user.loginSuccess.id);
        console.log(res.data);
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
    // 주소바꾼다는 API

    // GET 아이디만 보내면 된다.
    ChangeUserAddress(body)
      .then(res => {
        console.log(res.data);
        window.location.replace('/main');
        // 지역 정보 보냈을 때 데이터가 아직 안넘어온 거 같은데
        // setStores(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRemove = id => {
    console.log(id);
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
          height: document.body.clientHeight - 154,
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
          {renderStoreCard}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default MainPage;
