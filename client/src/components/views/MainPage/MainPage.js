import React from 'react';
import { Button, DatePicker, version } from 'antd';

function MainPage() {
  return (
    <div className="App">
      <h1>antd version: {version}</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  );
}

export default MainPage;
