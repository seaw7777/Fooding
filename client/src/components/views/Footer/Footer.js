import React from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import {
  FcHome,
  FcSearch,
  FcConferenceCall,
  FcVoicePresentation,
} from 'react-icons/fc';
import MyPage from '../MyPage/MyPage';

function Footer() {
  return (
    <div>
      <div style={{ backgroundColor: '#ffe7ba' }}>
        <Row
          style={{
            paddingTop: '0',
            textAlign: 'center',
            fontSize: '23px',
            marginBottom: '0',
          }}
        >
          <Col span={6}>
            <Link to="/">
              <FcHome />
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>홈</p>
            </Link>
          </Col>
          <Col span={6}>
            <a href="" style={{ color: 'black', textDecoration: 'none' }}>
              <FcSearch />
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>검색</p>
            </a>
          </Col>
          <Col span={6}>
            <Link>
              <FcConferenceCall />
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>동행자</p>
            </Link>
          </Col>
          <Col span={6}>
            {/* router link */}
            <Link to="/mypage">
              <FcVoicePresentation />
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                마이페이지
              </p>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
