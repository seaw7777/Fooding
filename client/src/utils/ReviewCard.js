import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

function ReviewCard(props) {
  console.log(props.store);
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '22rem', marginBottom: '0.5rem' }}>
            <Card.Img
              style={{ width: '22rem', height: '8rem' }}
              variant="top"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>hi</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ReviewCard;
