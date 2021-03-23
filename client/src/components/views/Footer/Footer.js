import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import {
  FcHome,
  FcSearch,
  FcConferenceCall,
  FcVoicePresentation,
} from 'react-icons/fc';

function Footer() {
  const activeStyle = {
    textDecoration: 'none',
  };
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
            <NavLink to="/" activeStyle={activeStyle}>
              <FcHome />
              <p
                style={{
                  color: 'black',
                  fontSize: '12px',
                  marginBottom: '8px',
                }}
              >
                홈
              </p>
            </NavLink>
          </Col>
          <Col span={6}>
            <a href="" style={{ stextDecoration: 'none' }}>
              <FcSearch />
              <p
                style={{
                  color: 'black',
                  fontSize: '12px',
                  marginBottom: '8px',
                }}
              >
                검색
              </p>
            </a>
          </Col>
          <Col span={6}>
            <NavLink to="/accompany" activeStyle={activeStyle}>
              <FcConferenceCall />
              <p
                style={{
                  color: 'black',
                  fontSize: '12px',
                  marginBottom: '8px',
                }}
              >
                동행자
              </p>
            </NavLink>
          </Col>
          <Col span={6}>
            <NavLink to="/mypage" activeStyle={activeStyle}>
              <FcVoicePresentation />
              <p
                style={{
                  color: 'black',
                  fontSize: '12px',
                  marginBottom: '8px',
                }}
              >
                마이페이지
              </p>
            </NavLink>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
