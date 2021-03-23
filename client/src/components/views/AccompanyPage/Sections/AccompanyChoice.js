import React from 'react';
import { Col, Row } from 'antd';

function AccompanyChoice() {
  return (
    <div style={{ margin: '20px' }}>
      <div style={{ fontSize: '25px' }}>동행자 선택</div>
      <br />
      <Row gutter={10}>
        <Col>부모님</Col>
        <Col>친구</Col>
        <Col>아이들</Col>
        <Col>반려동물</Col>
      </Row>
    </div>
  );
}

export default AccompanyChoice;
