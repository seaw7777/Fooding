import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import {
  FcHome,
  FcSearch,
  FcConferenceCall,
  FcVoicePresentation,
} from 'react-icons/fc';
import './Footer.css';

function Footer() {
  const activeStyle = {
    textDecoration: 'none',
  };

  const Clickele = event => {
    console.log(event.target.id);
    const overlay = document.getElementsByClassName('tab-overlay')[0];
    if (event.target.id === 'tab-1') {
      overlay.style.transform = 'translateX(0%)';
    } else if (event.target.id === 'tab-2') {
      overlay.style.transform = 'translateX(100%)';
    } else if (event.target.id === 'tab-3') {
      overlay.style.transform = 'translateX(200%)';
    } else if (event.target.id === 'tab-4') {
      overlay.style.transform = 'translateX(300%)';
    }
  };

  const RenderFooter = () => {
    let user = useSelector(state => state.user);

    if (user.loginSuccess) {
      return (
        <div
          style={{ backgroundColor: '#FDF5E6', borderTop: 'solid 1px orange' }}
        >
          <Row
            className="menu"
            style={{
              paddingTop: '0',
              textAlign: 'center',
              fontSize: '18px',
              marginBottom: '0',
              padding: '0.3rem',
            }}
          >
            <Col id="tab-1" span={6}>
              <NavLink
                onClick={Clickele}
                to="/main"
                id="tab-1"
                activeStyle={activeStyle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FcHome id="tab-1" />
                <p id="tab-1">홈</p>
                <div className="tab-overlay"></div>
              </NavLink>
            </Col>
            <Col span={6} id="tab-2">
              <NavLink
                onClick={Clickele}
                id="tab-2"
                to="/search"
                activeStyle={activeStyle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FcSearch id="tab-2" />
                <p id="tab-2">검색</p>
              </NavLink>
            </Col>
            <Col span={6}>
              <NavLink
                onClick={Clickele}
                id="tab-3"
                to="/accompany"
                activeStyle={activeStyle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FcConferenceCall id="tab-3" />
                <p id="tab-3">동행자</p>
              </NavLink>
            </Col>
            <Col span={6} id="tab-4">
              <NavLink
                onClick={Clickele}
                id="tab-4"
                to="/mypage"
                activeStyle={activeStyle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FcVoicePresentation id="tab-4" />
                <p id="tab-4">마이페이지</p>
              </NavLink>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return <div>{RenderFooter()}</div>;
}

export default Footer;
