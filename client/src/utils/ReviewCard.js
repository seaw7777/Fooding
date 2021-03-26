import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

function ReviewCard(props) {
  const renderReviewTitle = () => {
    // console.log(props.review.store_name);
    if (props.review.store_name === undefined) {
      return <Card.Title>{props.review.contents}</Card.Title>;
    } else {
      return <Card.Title>{props.review.store_name}</Card.Title>;
    }
  };

  const rednerReviewText = () => {
    if (props.review.nickname !== undefined) {
      return <Card.Text>{props.review.write_date.substring(0, 10)}</Card.Text>;
    } else {
      return <Card.Title>{props.review.contents}</Card.Title>;
    }
  };
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
            {renderReviewTitle()}
            {rednerReviewText()}
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default ReviewCard;
