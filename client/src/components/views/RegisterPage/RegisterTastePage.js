import React, { useState } from 'react';
import TasteAvatar from './Sections/TasteAvatar';
import { Typography, Button, Steps } from 'antd';
import 'antd/dist/antd.css';

function RegisterTastePage() {
  const { Title } = Typography;
  const { Step } = Steps;

  const [TasteList, setTasteList] = useState([
    { name: '한식', link: 'https://picsum.photos/100/100/?random' },
    { name: '분식', link: 'https://source.unsplash.com/random' },
    { name: '일식', link: 'https://source.unsplash.com/random' },
    { name: '카페', link: 'https://picsum.photos/100/100/?random' },
    { name: '중식', link: 'https://picsum.photos/100/100/?random' },
    { name: '양식', link: 'https://picsum.photos/100/100/?random' },
    { name: '술집', link: 'https://picsum.photos/100/100/?random' },
    { name: '베이커리', link: 'https://picsum.photos/100/100/?random' },
    { name: '햄버거', link: 'https://picsum.photos/100/100/?random' },
  ]);

  return (
    <div style={{ margin: '5% auto', padding: '2rem' }}>
      <Steps size="small" current={1}>
        <Step title="회원가입" />
        <Step title="취향선택" />
        <Step title="완료" />
      </Steps>
      ,
      <Title level={3} style={{ textAlign: 'center' }}>
        당신의 취향을 알려주세요
      </Title>
      <TasteAvatar list={TasteList} />
      <a href={`/`}>
        <Button
          type="primary"
          value="defalut"
          style={{
            display: 'flex',
            margin: '2rem auto',
            background: 'orange*5',
            borderColor: 'orange-5',
          }}
        >
          완료
        </Button>
      </a>
    </div>
  );
}

export default RegisterTastePage;
