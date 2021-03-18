import React from 'react';
import { Card, Avatar, Carousel } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

function RecommendFooder(props) {
  const { Meta } = Card;

  return (
    <div style={{ width: '250px', margin: 'auto' }}>
      <Carousel>
        {props.list.map((fooder, index) => (
          <div style={{ height: '100px', width: '150px' }}>
            <Card
              hoverable
              cover={
                <img alt="example" src={fooder.img} style={{ width: '100%' }} />
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={fooder.title}
                  description="푸더 설명"
                />
                <PlusCircleFilled />
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default RecommendFooder;
