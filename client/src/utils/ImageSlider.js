import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

function ImageSlider(props) {
  const renderItem = () => {
    if (props.images > 0) {
      for (var step = 0; step < props.images; step++) {
        // Runs 5 times, with values of step 0 through 4.
        return (
          <Carousel.Item>
            <img
              style={{ width: '100%', height: '130px' }}
              src={`https://j4d107.p.ssafy.io/media/store/${props.storeId}_${step}.png`}
            />
          </Carousel.Item>
        );
      }
    } else {
      return (
        <Carousel.Item>
          <img
            style={{ width: '100%', height: '130px' }}
            src={'/images/Fooding/가게 이미지.png'}
          />
        </Carousel.Item>
      );
    }
  };

  return (
    <div>
      <Carousel>{renderItem()}</Carousel>
    </div>
  );
}

export default ImageSlider;
