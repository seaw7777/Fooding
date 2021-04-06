import React from 'react';
import { Carousel } from 'react-bootstrap';

function ImageSlider(props) {
  return (
    <div>
      <Carousel>
        {props.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              style={{ width: '100%', height: '130px' }}
              src={'/images/Fooding/가게 이미지.png'}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
