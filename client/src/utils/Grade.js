import React from 'react';

function Grade(props) {
  return (
    <div>
      {props.grade === 'welcome' ? (
        <img
          src="/images/grade/welcome.png"
          alt="parents"
          style={{ maxWidth: '21px', maxHeight: '21px' }}
        />
      ) : null}
      {props.grade === 'silver' ? (
        <img
          src="/images/grade/silver.png"
          alt="parents"
          style={{ maxWidth: '21px', maxHeight: '21px' }}
        />
      ) : null}
      {props.grade === 'gold' ? (
        <img
          src="/images/grade/gold.png"
          alt="parents"
          style={{ maxWidth: '21px', maxHeight: '21px' }}
        />
      ) : null}
    </div>
  );
}

export default Grade;
