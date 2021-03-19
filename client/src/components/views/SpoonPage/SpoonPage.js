import React from 'react';
import { LeftCircleOutlined } from '@ant-design/icons';
import { GiSpoon } from 'react-icons/gi';

function SpoonPage() {
  return (
    <div style={{ margin: '2rem' }}>
      <div
        style={{
          fontSize: '18px',
          paddingBottom: '15px',
          borderBottom: 'solid',
        }}
      >
        <a href="/mypage" style={{ color: 'grey' }}>
          <LeftCircleOutlined
            style={{ fontSize: '25px', marginRight: '10px' }}
          />
        </a>
        스푼 관리
      </div>
      <div style={{ margin: '3.5rem', marginBottom: '2rem', fontSize: '45px' }}>
        <GiSpoon
          style={{ color: 'grey', marginRight: '10px', fontSize: '50px' }}
        />
        100스푼
      </div>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        리뷰 1건당 50 스푼
      </p>
      <hr />
      <div style={{ fontWeight: 'bold' }}>스푼 이용내역</div>
    </div>
  );
}

export default SpoonPage;
