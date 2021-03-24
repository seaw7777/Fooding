import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

function ReviewCard() {
  const example = [1, 2, 3, 4, 5, 6];

  // const renderCards = example.map(index => {
  //   return (
  //     <Row key={index} style={{ marginTop: '1rem' }}>
  //       <Col>
  //         <Card style={{ width: '400' }}>
  //           <Card.Img
  //             variant="top"
  //             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //           />
  //           <Card.Body>
  //             <Card.Title>Card Title</Card.Title>
  //             <Card.Text>
  //               Some quick example text to build on the card title and make up
  //               the bulk of the card's content.
  //             </Card.Text>
  //             <Button variant="primary">Go somewhere</Button>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     </Row>
  //   );
  // });

  return (
    <div style={{ display: 'flex' }}>
      <Container>
        <div
          style={{
            height: 335,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <InfiniteScroll dataLength={example.length}>
            {example.map((idx, index) => (
              <Row key={index}>
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
            ))}
          </InfiniteScroll>
        </div>
      </Container>
    </div>
  );
}

export default ReviewCard;
