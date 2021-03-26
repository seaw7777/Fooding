import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function CheckReceiptPage() {
  return (
    <div>
      CheckReceiptPage
      <Link to="/review/post">
        <Button>다음</Button>
      </Link>
    </div>
  );
}

export default CheckReceiptPage;
