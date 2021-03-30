import React, { useState, useEffect } from 'react';
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
  const [lan, setlan] = useState('');
  const [lng, setlng] = useState('');
  console.log(props.address);
  const [Address, setAddress] = useState('');
  const [IsPostOpen, setIsPostOpen] = useState(false);

  const [isZoneCode, setIsZoneCode] = useState();

  const nowPlaceHandler = () => {
    var geocoder = new kakao.maps.services.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setlan(position.coords.latitude); // 위도
        setlng(position.coords.longitude); // 경도
      });
    }
    var coord = new kakao.maps.LatLng(lan, lng);
    geocoder.coord2Address(
      coord.getLng(),
      coord.getLat(),
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
          console.log(result);
          props.change(result[0].address.address_name);
        }
      },
    );
  };

  const codeHandler = () => {
    setIsPostOpen(!IsPostOpen);
  };

  const handleComplete = data => {
    let fullAddress = data.address;

    // console.log(data.address);
    // if (data.addressType === 'R') {
    //   if (data.bname !== '') {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== '') {
    //     extraAddress +=
    //       extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    // }
    setIsZoneCode(data.zonecode);
    setAddress(fullAddress);
    setIsPostOpen(!IsPostOpen);
    props.change(fullAddress);
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
