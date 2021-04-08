import React from 'react';
import { Timeline } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

function Diary(props) {
  const renderTimeLine = props.review.map((rv, index) => {
    return (
      <Timeline.Item color="red" style={{ marginTop: '0.1rem' }} key={index}>
        {rv.store_name} &nbsp;&nbsp;&nbsp;{rv.write_date.substring(0, 10)}
      </Timeline.Item>
    );
  });
  return (
    <div
      style={{
        height: document.body.clientHeight - 390,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <InfiniteScroll dataLength={props.review.length}>
        <Timeline
          className="timeLine"
          mode="left"
          style={{ paddingLeft: '2.5rem', margin: '1rem' }}
        >
          {renderTimeLine}
        </Timeline>
      </InfiniteScroll>
    </div>
  );
}

export default Diary;
