import React from 'react';
import { Card, Avatar, Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { UserOutlined } from '@ant-design/icons';
const settings = {
  // dots: true,
  infinite: true,
  // speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};
function RecommendFooder(props) {
  const { Meta } = Card;
  return (
    <div
      style={{
        width: '400px',
        height: '100px',
        padding: '0.8rem',
      }}
    >
      {/* <Carousel autoplay> */}
      <Slider {...settings}>
        {props.list.map((fooder, index) => (
          <div
            key={index}
            style={{
              height: '50px',
              width: '50px',
            }}
          >
            <Link
              to={{
                pathname: `/fooder/${fooder.id}`,
                state: {
                  username: fooder.nickname,
                  spoon_cnt: fooder.spoon_cnt,
                  grade: fooder.grade,
                },
              }}
            >
              <div>
                <img
                  src="./images/cat.jpg"
                  style={{
                    margin: '0',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: 'solid green',
                    marginLeft: '1.4rem',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: '0.5rem',
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                {fooder.nickname}
              </div>
            </Link>
            {/* <Button
                  type="primary"
                  shape="round"
                  size={'small'}
                  style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
                >
                  팔로우
                </Button> */}
          </div>
        ))}
      </Slider>
      {/* </Carousel> */}
    </div>
  );
}

export default RecommendFooder;
