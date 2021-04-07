import React, { useState } from 'react';
import { Typography } from 'antd';
import { CompassTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import DaumPostcode from 'react-daum-postcode';

const { Title } = Typography;

const postCodeStyle = {
  display: 'block',
  position: 'absolute',
  zIndex: 2,
  top: '10%',
  width: '400px',
  height: '500px',
  padding: '7px',
};
const { kakao } = window;
function MainPageBar(props, { change }) {
  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');
  const [Address, setAddress] = useState('');
  const [IsPostOpen, setIsPostOpen] = useState(false);
  const [isZoneCode, setIsZoneCode] = useState();

  const nowPlaceHandler = () => {
    var geocoder = new kakao.maps.services.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setlat(position.coords.latitude); // 위도
        setlng(position.coords.longitude); // 경도
      });
    }
    var coord = new kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(
      coord.getLng(),
      coord.getLat(),
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
          const region_name = [
            result[0].address.region_1depth_name,
            result[0].address.region_2depth_name,
            result[0].address.region_3depth_name,
          ];
          props.change(result[0].address.address_name, lat, lng, region_name);
        }
      },
    );
  };

  const codeHandler = () => {
    setIsPostOpen(!IsPostOpen);
  };

  const handleComplete = data => {
    var geocoder = new kakao.maps.services.Geocoder();
    let fullAddress = data.address;
    const region_name = [data.sido, data.sigungu, data.roadname];

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setlat(result[0].road_address.x); // 위도
        setlng(result[0].road_address.y); //경도
      }
    };
    geocoder.addressSearch(fullAddress, callback);
    setIsZoneCode(data.zonecode);
    setAddress(fullAddress);
    setIsPostOpen(!IsPostOpen);
    props.change(fullAddress, lat, lng, region_name);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45px',
        width: '100%',
        backgroundColor: 'orange',
      }}
    >
      <Title
        level={5}
        style={{ margin: '1rem 1rem', color: 'white' }}
        onClick={nowPlaceHandler}
      >
        {props.address}
      </Title>

      <CompassTwoTone
        twoToneColor="#fa8c16"
        style={{ fontSize: '25px' }}
        onClick={codeHandler}
      />
      {IsPostOpen && (
        <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
      )}
    </div>
  );
}
export default MainPageBar;
