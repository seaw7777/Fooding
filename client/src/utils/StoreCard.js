import React from 'react';
import { Row, Col, Card, Button, Container, Image } from 'react-bootstrap';
import { StarFilled } from '@ant-design/icons';

function StoreCard() {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Image
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            roundedCircle
            style={{ width: '50px', height: '50px' }}
          />
          <div>
            <Card.Title>가게이름</Card.Title>
            <Card.Text>리뷰갯수</Card.Text>
          </div>
          <StarFilled style={{ fontSize: '50px', color: '#faad14' }} />
        </div>
        <Card.Img
          variant="top"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Text>리뷰내용</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StoreCard;
