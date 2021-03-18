import React from 'react';
import { Card, Avatar } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

function RecommendFooder() {
  const { Meta } = Card;

  return (
    <div>
      <Card
        hoverable
        style={{ width: 200, border: 'solid orange-1', padding: '2rem' }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="푸더 이름 넣는 곳"
            description="푸더 설명"
          />
          <PlusCircleFilled />
        </div>
      </Card>
    </div>
  );
}

export default RecommendFooder;
