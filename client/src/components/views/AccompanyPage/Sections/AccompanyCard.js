import React from 'react';
import StoreCard from '../../../../utils/StoreCard';
function AccompanyCard() {
  const roomNumber = [1, 2, 3, 4, 5, 6];

  const renderStoreCard = roomNumber.map((number, index) => {
    return <StoreCard store={number} />;
  });
  return <div>{renderStoreCard}</div>;
}

export default AccompanyCard;
