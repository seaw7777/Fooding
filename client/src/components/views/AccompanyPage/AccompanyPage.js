import React from 'react';
import AccompanyChoice from './Sections/AccompanyChoice';
import StoreCard from '../../../utils/StoreCard';

function AccompanyPage() {
  const roomNumber = [1, 2, 3, 4, 5, 6];

  const renderStoreCard = roomNumber.map((number, index) => {
    return <StoreCard store={number} />;
  });

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          paddingBottom: '3rem',
          paddingTop: '1rem',
        }}
      >
        <AccompanyChoice />
      </div>
      {renderStoreCard}
    </div>
  );
}

export default AccompanyPage;
