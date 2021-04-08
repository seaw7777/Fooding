import React, { useState } from 'react';
import { Row, Col } from 'antd';
import AccompanyCard from './Sections/AccompanyCard';
import { fetchAccompany } from '_api/Recommend';

function AccompanyPage(props) {
  const [Select, setSelect] = useState([]);
  const [Accompany, setAccompany] = useState('');

  const SelectChoice = accompany => {
    setAccompany(accompany);
    let body = {
      user_id: props.user.loginSuccess.id,
      companion: accompany,
    };
    fetchAccompany(body)
      .then(res => {
        setSelect(res.data);
      })
      .catch(err => console.log(err));
  };

  const AccompanyName = accompany => {
    if (accompany === 'parent') {
      return '부모님과 함께 가기 좋은 가게들입니다.';
    } else if (accompany === 'friend') {
      return '친구와 함께 가기 좋은 가게들입니다.';
    } else if (accompany === 'children') {
      return '아이들과 함께 가기 좋은 가게들입니다.';
    } else if (accompany === 'pet') {
      return '반려동물과 함께 가기 좋은 가게들입니다.';
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          paddingBottom: '2rem',
          paddingTop: '0.5rem',
          height: '214px',
        }}
      >
        <div style={{ margin: '18px' }}>
          <div style={{ fontSize: '25px', fontWeight: 'bold' }}>
            동행자 선택
          </div>
          <br />
          <Row gutter={10} style={{ textAlign: 'center' }}>
            <Col span={6} onClick={() => SelectChoice('parent')}>
              <img
                src="/images/parents.png"
                alt="parents"
                style={{ maxWidth: '60px', maxHeight: '60px' }}
              />
              <div>부모님</div>
            </Col>
            <Col span={6} onClick={() => SelectChoice('friend')}>
              <img
                src="/images/friends.png"
                alt="friends"
                style={{ maxWidth: '60px', maxHeight: '60px' }}
              />
              <div>친구</div>
            </Col>
            <Col span={6} onClick={() => SelectChoice('children')}>
              <img
                src="/images/toys.png"
                alt="toys"
                style={{ maxWidth: '60px', maxHeight: '60px' }}
              />
              <div>아이들</div>
            </Col>
            <Col span={6} onClick={() => SelectChoice('pet')}>
              <img
                src="/images/pets.png"
                alt="pets"
                style={{ maxWidth: '60px', maxHeight: '60px' }}
              />
              <div>반려동물</div>
            </Col>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                margin: '0.5rem auto',
              }}
            >
              {AccompanyName(Accompany)}
            </p>
          </Row>
        </div>
      </div>
      <AccompanyCard select={Select} />
    </div>
  );
}

export default AccompanyPage;
