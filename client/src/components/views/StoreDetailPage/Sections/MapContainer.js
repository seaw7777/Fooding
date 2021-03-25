import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = props => {
  const map_lat = props.MapInfo['lat'];
  const map_lng = props.MapInfo['lng'];
  console.log(map_lat);
  useEffect(() => {
    console.log('lat', map_lat);
    console.log('lng', map_lng);
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(
        parseInt(parseFloat(map_lat)),
        parseInt(parseFloat(map_lng)),
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: '300px',
        height: '270px',
      }}
    ></div>
  );
};

export default MapContainer;
