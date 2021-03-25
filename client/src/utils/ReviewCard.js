import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

function ReviewCard(props) {
  console.log(props.review);
  return (
    <div>
      <Row>
        <Col>
          <Card style={{ width: '22rem', marginBottom: '0.5rem' }}>
            <Card.Img
              style={{ width: '22rem', height: '8rem' }}
              variant="top"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <Card.Body>
              <Card.Title>{props.review.store_name}</Card.Title>
              <Card.Text>{props.review.contents}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ReviewCard;
