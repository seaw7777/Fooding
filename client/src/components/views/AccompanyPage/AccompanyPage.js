import React, { useState } from 'react';
import { Row, Col } from 'antd';
import AccompanyCard from './Sections/AccompanyCard';

function AccompanyPage() {
  const [Select, setSelect] = useState('');

  const SelectChoice = accompany => {
    setSelect(accompany);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          paddingBottom: '2rem',
          paddingTop: '0.5rem',
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
          </Row>
        </div>
      </div>
      <AccompanyCard select={Select} />
    </div>
  );
}

export default AccompanyPage;
