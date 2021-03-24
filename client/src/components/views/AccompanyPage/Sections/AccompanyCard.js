import React from 'react';
import StoreCard from '../../../../utils/StoreCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function AccompanyCard() {
  const roomNumber = [1, 2, 3, 4, 5, 6];

  const renderStoreCard = roomNumber.map((number, index) => {
    return <StoreCard store={number} />;
  });
  return (
    <div>
      <div
        style={{
          height: 400,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <InfiniteScroll dataLength={'10'}>{renderStoreCard}</InfiniteScroll>
      </div>
    </div>
  );
}

export default AccompanyCard;