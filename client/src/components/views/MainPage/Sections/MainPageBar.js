import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { CompassTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

function MainPageBar(props) {
  const { Title } = Typography;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '100%',
        backgroundColor: 'orange',
      }}
    >
      <Title level={3} style={{ margin: '1rem 1.5rem', color: 'white' }}>
        {props.address}
      </Title>
      <a href={'/login'}>
        <CompassTwoTone twoToneColor="#fa8c16" style={{ fontSize: '25px' }} />
      </a>
    </div>
  );
}

export default MainPageBar;
