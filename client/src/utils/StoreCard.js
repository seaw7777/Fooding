import React from 'react';
import { Row, Col, Card, Button, Container, Image } from 'react-bootstrap';
import { StarFilled } from '@ant-design/icons';

function StoreCard(props) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '1rem auto' }}>
        <div
          style={{
            display: 'flex',
            margin: '0.5rem',
          }}
        >
          <Image
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            roundedCircle
            style={{ width: '50px', height: '50px' }}
          />
          <div style={{ marginLeft: '1rem' }}>
            <Card.Title style={{ fontSize: '18px', margin: '0.3rem' }}>
              {props.store.store_name}
            </Card.Title>
            <Card.Text style={{ marginRight: '0.4rem', marginLeft: '0.4rem' }}>
              {props.store.review_cnt}
            </Card.Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <StarFilled style={{ fontSize: '28px', color: '#faad14' }} />
          </div>
        </div>
        <a href={`/store/${props.store.id}`}>
          <Card.Img
            variant="top"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </a>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Text>리뷰내용</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StoreCard;
