import React, { useState, useEffect } from 'react';
import './FooderReviewItems.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
function FooderReviewItems(props) {
  const [defaultUrl, setdefaultUrl] = useState('');
  useEffect(() => {
    setdefaultUrl(
      `https://j4d107.p.ssafy.io/media/review/${props.review.id}_0.png`,
    );
  }, []);

  return (
    <div
      id="item"
      className="item"
      style={{
        backgroundImage: `URL(${defaultUrl})`,
        borderRadius: '20px',
      }}
    >
      <div className="content">
        <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
          {props.review.store_name}
        </span>
        <Box component="fieldset" mb={2} borderColor="transparent">
          <Rating name="read-only" value={props.review.star} readOnly />
        </Box>
      </div>
      <div className="itemcover" style={{ borderRadius: '20px' }}></div>
    </div>
  );
}

export default FooderReviewItems;
