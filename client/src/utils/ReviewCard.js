import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
function ReviewCard() {
  const example = [1, 2, 3];

  const renderCards = example.map(index => {
    return (
      <Row key={index} style={{ marginTop: '1rem' }}>
        <Col>
          <Card style={{ width: '400' }}>
            <Card.Img
              variant="top"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  });

  return (
    <div style={{ display: 'flex' }}>
      <Container>{renderCards}</Container>
    </div>
  );
}

export default ReviewCard;
