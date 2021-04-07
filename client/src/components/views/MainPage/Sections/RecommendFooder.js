<<<<<<< HEAD
import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
=======
import React, { useState } from 'react';
import { Card, Avatar, Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { UserOutlined } from '@ant-design/icons';
>>>>>>> 41e91871070e2276a236b862dfa5ea4382854040

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
};
function RecommendFooder(props) {
  const { Meta } = Card;
  const [hereImage, sethereImage] = useState(true);
  const [notImage, setnotImage] = useState(false);
  const defaultProfile = './images/cat.jpg';

  const renderFooderImage = e => {
    e.target.src = defaultProfile;
  };

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
                  src={`http://j4d107.p.ssafy.io:8000/media/user/${fooder.id}_profile.png`}
                  style={{
                    margin: '0',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: 'solid green',
                    marginLeft: '1.4rem',
                  }}
                  onError={renderFooderImage}
                />

                {/* {notImage && (
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
                )} */}
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
          </div>
        ))}
      </Slider>
      {/* </Carousel> */}
    </div>
  );
}

export default RecommendFooder;
