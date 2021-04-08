import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function RecommendFooder(props) {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    pauseOnHover: true,
  };

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
                  src={`https://j4d107.p.ssafy.io/media/user/${fooder.id}_profile.png`}
                  style={{
                    margin: '0',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px dotted #FF7F50',
                    marginLeft: '1.4rem',
                  }}
                  onError={renderFooderImage}
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
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecommendFooder;
