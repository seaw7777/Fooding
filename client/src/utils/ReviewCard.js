import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function ReviewCard(props) {
  // console.log(props.review);
  const [reviewUrl, setreviewUrl] = useState('');
  useEffect(() => {
    setreviewUrl(
      `https://j4d107.p.ssafy.io/media/review/${props.review.id}_0.png`,
    );
  }, []);

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
      return <Card.Text>{props.review.write_date.slice(0, 10)}</Card.Text>;
    } else {
      return (
        <Card.Title style={{ fontSize: '15px' }}>
          {props.review.contents}
        </Card.Title>
      );
    }
  };

  const renderImage = () => {
    setreviewUrl('/images/Fooding/리뷰 이미지1.png');
  };
  return (
    <div>
      <Col>
        <Card style={{ width: '22rem', marginBottom: '0.5rem' }}>
          <Card.Img
            style={{ width: '22rem', height: '8rem' }}
            variant="top"
            src={reviewUrl}
            onError={renderImage}
          />
          <Card.Body>
            {renderReviewTitle()}
            {rednerReviewText()}
            <Box
              component="fieldset"
              mb={2}
              borderColor="transparent"
              style={{ marginBottom: '0' }}
            >
              <Rating name="read-only" value={props.review.star} readOnly />
            </Box>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default ReviewCard;
