import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import {
  FcHome,
  FcSearch,
  FcConferenceCall,
  FcVoicePresentation,
} from 'react-icons/fc';
import './Footer.css';
import { red } from '@material-ui/core/colors';

function Footer() {
  const activeStyle = {
    textDecoration: 'none',
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
            <div className="tab-overlay"></div>
            <Col
              span={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NavLink to="/main" activeStyle={activeStyle} id="tab-1">
                {/* <div className="tab-overlay" id="tab-1"></div> */}
                <FcHome size={35} />
                <p>홈</p>
              </NavLink>
            </Col>
            <Col span={6}>
              <NavLink to="/search" activeStyle={activeStyle}>
                {/* <div className="tab-overlay" id="tab-2"></div> */}
                <FcSearch />
                <p id="tab-2">검색</p>
              </NavLink>
            </Col>
            <Col span={6}>
              <NavLink to="/accompany" activeStyle={activeStyle}>
                {/* <div className="tab-overlay" id="tab-3"></div> */}
                <FcConferenceCall />
                <p id="tab-3">동행자</p>
              </NavLink>
            </Col>
            <Col span={6}>
              <NavLink to="/mypage" activeStyle={activeStyle}>
                {/* <div className="tab-overlay" id="tab-4"></div> */}
                <FcVoicePresentation />
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
