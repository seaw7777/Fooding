import React, { useState } from 'react';
import { Avatar, Row, Col, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function TasteAvatar(props) {
  // Taste avatar 렌더하기
  const renderTasteAvatar = props.list.map((value, index) => (
    <Col span={8} key={index}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a href={'/register'}>
          <img
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            preview={{ visible: false }}
            src={`${value.link}`}
          ></img>
        </a>
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
