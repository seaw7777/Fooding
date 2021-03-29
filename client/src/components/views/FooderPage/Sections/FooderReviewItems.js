import React from 'react';
import './FooderReviewItems.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
function FooderReviewItems(props) {
  return (
    <div
      className="item"
      style={{
        backgroundImage: `URL('/images/basicImage.jpg')`,
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
