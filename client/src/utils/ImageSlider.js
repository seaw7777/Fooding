import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

function ImageSlider(props) {
  console.log(props.storeId);
  console.log(props.images);
  // const [imageList, setimageList] = useState([]);
  // // 이미지 개수가 몇 개인지 확인 한 후 보여주기
  // const li = [];
  // for (var step = 0; step < props.images; step++) {
  //   li.push(step);
  // }
  // setimageList(li);

  // console.log(imageList);

  const renderItem = () => {
    if (props.images > 0) {
      for (var step = 0; step < props.images; step++) {
        // Runs 5 times, with values of step 0 through 4.
        return (
          <Carousel.Item>
            <img
              style={{ width: '100%', height: '130px' }}
              src={`http://j4d107.p.ssafy.io:8000/media/store/${props.storeId}_${step}.png`}
              // src="http://59.23.41.85:8088/media/review/252_14504_4_1.png"
              // src={'/images/Fooding/가게 이미지.png'}
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
            // src="http://59.23.41.85:8088/media/review/252_14504_4_1.png"
            // src={'/images/Fooding/가게 이미지.png'}
          />
        </Carousel.Item>
      );
    }
  };

  return (
    <div>
      <Carousel>
        {renderItem()}
        {/* {[1, 2].map((image, index) => (
          <Carousel.Item key={index}>
            <img
              style={{ width: '100%', height: '130px' }}
              src={`http://j4d107.p.ssafy.io:8000/media/review/252_14504_4_1.png`}
              // src="http://59.23.41.85:8088/media/review/252_14504_4_1.png"
              // src={'/images/Fooding/가게 이미지.png'}
            />
          </Carousel.Item>
        ))} */}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
