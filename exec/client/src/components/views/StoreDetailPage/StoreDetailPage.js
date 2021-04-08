import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageSlider from 'utils/ImageSlider';
import ReviewCard from 'utils/ReviewCard';
import StoreMenu from './Sections/StoreMenu';
import { Typography, Button } from 'antd';
import { PhoneFilled, CompassTwoTone, ProfileFilled } from '@ant-design/icons';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sections/StoreDetailPage.css';
import { StoreDetailInfo, StoreMenuInfo } from '_api/Stores';
import { fetchStoreReview } from '_api/Review';
import { fetchLikeStore, fetchDeleteStore } from '_api/User';
import InfiniteScroll from 'react-infinite-scroll-component';
import Rating from '@material-ui/lab/Rating';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function StoreDetailPage(props) {
  const { Title, Text } = Typography;
  const [StoreInfo, setStoreInfo] = useState([]);
  const storeId = props.match.params.StoreId;
  const user = useSelector(state => state.user);
  const [Reviews, setReviews] = useState([]);
  const [Menus, setMenus] = useState([]);
  const { kakao } = window;
  const [likeStoreCheck, setlikeStoreCheck] = useState(false);

  useEffect(() => {
    const StoreAllInfo = async () => {
      try {
        const response = await StoreDetailInfo(
          storeId,
          props.user.loginSuccess.id,
        );
        setStoreInfo(response.data[0]);
        setlikeStoreCheck(response.data[0].isWish);
        const res = await fetchStoreReview(storeId);
        let reviews = res.data.sort(
          (a, b) => Date.parse(b.write_date) - Date.parse(a.write_date),
        );
        setReviews(reviews);
        const ress = await StoreMenuInfo(storeId);
        setMenus(ress.data);

        const container = document.getElementById('myMap');
        const options = {
          center: new kakao.maps.LatLng(
            response.data[0].lat,
            response.data[0].lng,
          ),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const imageSrc = '/images/FoodingMarker.png',
          imageSize = new kakao.maps.Size(64, 69),
          imageOption = { offset: new kakao.maps.Point(27, 69) };

        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          ),
          markerPosition = new kakao.maps.LatLng(
            response.data[0].lat,
            response.data[0].lng,
          );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      } catch (err) {
        console.log(err);
      }
    };
    StoreAllInfo();
  }, []);

  const likeStoreHandler = () => {
    setlikeStoreCheck(true);
    fetchLikeStore(props.user.loginSuccess.id, storeId).then(res => {
      console.log(res.data);
    });
  };

  const dislikeStoreHandler = () => {
    setlikeStoreCheck(false);
    fetchDeleteStore(props.user.loginSuccess.id, storeId).then(res => {
      console.log(res.data);
    });
  };

  const renderReviewCard = () => {
    return (
      <div>
        <Link
          to={{
            pathname: '/review/check-receipt',
            state: {
              store_id: storeId,
              user_id: user.loginSuccess.id,
            },
          }}
        >
          <Button
            shape="round"
            style={{
              margin: '5px auto',
              backgroundColor: '#F4A460',
              borderColor: '#F4A460',
              lineHeight: 'center',
            }}
            icon={
              <ProfileFilled
                style={{
                  fontSize: '20px',
                  color: 'black',
                }}
              />
            }
            size={'large'}
          >
            리뷰 작성
          </Button>
        </Link>
        <div
          style={{
            height: document.body.clientHeight - 500,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <InfiniteScroll dataLength={Reviews.length}>
            {Reviews.map((review, index) => (
              <ReviewCard review={review}></ReviewCard>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <ImageSlider images={StoreInfo.image} storeId={storeId} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            margin: '0.5rem auto',
          }}
        >
          <img
            style={{
              borderRadius: '30%',
              width: '75px',
              height: '55px',
              border: 'solid 2px #FF4500',
            }}
            src={'/images/Fooding/로고 이미지.png'}
          />
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-space',
                alignItems: 'center',
                marginTop: '0.5rem',
              }}
            >
              <Title level={5}>{StoreInfo.store_name}</Title>
              <Text
                style={{ marginLeft: '0.5em', marginBottom: '0.5rem' }}
                mark
              >
                {StoreInfo.main_category}
              </Text>
            </div>
            <Rating name="read-only" value={StoreInfo.star} readOnly />
          </div>
          <div>
            {likeStoreCheck ? (
              <AiFillHeart
                style={{
                  fontSize: '25px',
                  marginBottom: '2.5rem',
                  color: 'red',
                }}
                onClick={dislikeStoreHandler}
              />
            ) : (
              <AiOutlineHeart
                style={{
                  fontSize: '25px',
                  marginBottom: '2.5rem',
                  color: 'red',
                }}
                onClick={likeStoreHandler}
              />
            )}
          </div>
        </div>
        <div
          style={{
            border: 'solid 2px #FF4500',
            padding: '1rem',
            width: '90%',
            margin: '0rem auto 0.5rem',
          }}
        >
          <PhoneFilled style={{ marginRight: '1rem' }} />
          <Text>{StoreInfo.tel}</Text>
          <br />
          <CompassTwoTone style={{ marginRight: '1rem' }} />
          <Text>{StoreInfo.address}</Text>
        </div>

        <div>
          <Tabs className="myClass" fill defaultActiveKey="storeMap">
            <Tab eventKey="storeMap" title="지도">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: '1rem',
                }}
              >
                <div
                  id="myMap"
                  style={{
                    height: '15rem',
                    width: '80%',
                  }}
                ></div>
              </div>
            </Tab>
            <Tab eventKey="storeReview" title="리뷰">
              <div>{renderReviewCard()}</div>
            </Tab>
            <Tab eventKey="storeMenu" title="메뉴">
              {Menus.length > 0 ? (
                <StoreMenu Menus={Menus} />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '25%',
                  }}
                >
                  <h3>등록된 메뉴가 없습니다.</h3>
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default StoreDetailPage;
