import React from 'react';
import MapContainer from './MapContainer';

function StoreMap(props) {
  console.log(props.MapInfo);
  // MapInfo이름으로 props 했어!!
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
      }}
    >
      {/* <img src={'https://picsum.photos/280/400/?random'} /> */}
      <MapContainer />
    </div>
  );
}

export default StoreMap;
