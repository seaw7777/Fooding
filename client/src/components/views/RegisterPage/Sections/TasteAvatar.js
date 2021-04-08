import React, { useState } from 'react';
import { Row, Col } from 'antd';

import 'antd/dist/antd.css';

function TasteAvatar(props) {
  const [Tastes, setTastes] = useState([]);

  const handleTastes = (target, value) => {
    target.style.opacity = 0.5;
    const newTastes = [...Tastes];
    if (!newTastes.includes(value)) {
      newTastes.push(value);
    }
    setTastes(newTastes);
    props.handleFilters(newTastes);
  };

  const renderTasteAvatar = props.list.map((value, index) => (
    <Col span={8} key={index}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          preview={{ visible: false }}
          src={`${value.link}`}
          onClick={event => handleTastes(event.target, value.name)}
        ></img>
        <p style={{ textAlign: 'center' }}>{value.name}</p>
      </div>
    </Col>
  ));

  return (
    <div style={{ margin: 'auto' }}>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        {renderTasteAvatar}
      </Row>
    </div>
  );
}

export default TasteAvatar;
