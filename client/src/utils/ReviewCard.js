import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function ReviewCard(props) {
  console.log(props.review);
  const renderReviewTitle = () => {
    if (props.review.store_name === undefined) {
      return (
        <Card.Title style={{ fontSize: '15px' }}>
          {props.review.contents}
        </Card.Title>
      );
    } else {
      return <Card.Title>{props.review.store_name}</Card.Title>;
    }
  };

  const rednerReviewText = () => {
    // let date = props.review.write_date.slice(0, 10);
    if (props.review.nickname !== undefined) {
      // return <Card.Text>{props.review.write_date.split(0, 10)}</Card.Text>;
    } else {
      return (
        <Card.Title style={{ fontSize: '15px' }}>
          {props.review.contents}
        </Card.Title>
      );
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
            <Box component="fieldset" mb={2} borderColor="transparent">
              <Rating name="read-only" value={props.review.star} readOnly />
            </Box>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default ReviewCard;
