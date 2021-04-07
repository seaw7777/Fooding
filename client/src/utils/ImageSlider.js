import React from 'react';
import { Carousel } from 'react-bootstrap';

function ImageSlider(props) {
  console.log(props.storeId);
  // 이미지 개수가 몇 개인지 확인 한 후 보여주기

  return (
    <div>
      <Carousel>
        {props.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              style={{ width: '100%', height: '130px' }}
              // src = {`http://j4d107.p.ssafy.io:8000/media/store/${}`}
              src="http://59.23.41.85:8088/media/review/252_14504_4_1.png"
              // src={'/images/Fooding/가게 이미지.png'}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
