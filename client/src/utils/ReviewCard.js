import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

function ReviewCard(props) {
  return (
    <div>
      <Col>
        <Card style={{ width: '22rem', marginBottom: '0.5rem' }}>
          <Card.Img
            style={{ width: '22rem', height: '8rem' }}
            variant="top"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <Card.Body>
            <Card.Title>{props.review.store_name}</Card.Title>
            <Card.Text>{props.review.content}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default ReviewCard;
