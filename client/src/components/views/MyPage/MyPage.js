import React, { useState } from 'react';
import { Row, Col, Avatar, Badge, Button } from 'antd';
import { Tabs, Tab } from 'react-bootstrap';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Diary from './Components/Diary';
// import DetailReview from './Components/DetailReview';
import ReviewCard from '../../../utils/ReviewCard';

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
};

function MyPage() {
  const [showPage, setshowPage] = useState(true);
  const [diaryButtonStyle, setdiaryButtonStyle] = useState({
    backgroundColor: '#faad14',
    borderColor: '#faad14',
  });
  const [detailButtonStyle, setdetailButtonStyle] = useState({
    color: '#faad14',
    borderColor: '#faad14',
  });

  const showPageButton = () => {
    setshowPage(!showPage);
    if (showPage === false) {
      setdiaryButtonStyle({
        backgroundColor: '#faad14',
        borderColor: '#faad14',
      });
      setdetailButtonStyle({ color: '#faad14', borderColor: '#faad14' });
    } else {
      setdiaryButtonStyle({
        color: '#faad14',
        borderColor: '#faad14',
        backgroundColor: 'white',
      });
      setdetailButtonStyle({
        color: 'white',
        backgroundColor: '#faad14',
        borderColor: '#faad14',
      });
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffd666',
          width: '100%',
          marginTop: '3rem',
          paddingBottom: '3rem',
          paddingTop: '2rem',
        }}
      >
        <Row style={rowStyle}>
          <Col>
            <Badge
              offset={[-10, 55]}
              count={
                <EditOutlined style={{ fontSize: 20, marginRight: '-22' }} />
              }
            >
              <Avatar size={64} icon={<UserOutlined />} />
            </Badge>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col>
            <span>username</span>
          </Col>
        </Row>
        <Row className="mypagetag" style={{ textAlign: 'center' }}>
          <Col span={6}>
            {/* row 추가해야할 듯 */}
            <span>리뷰</span>
          </Col>
          <Col span={6}>
            <a href="/follow" style={{ color: 'black' }}>
              팔로우
            </a>
          </Col>
          <Col span={6}>
            <span>팔로잉</span>
          </Col>
          <Col span={6}>
            <span>스푼</span>
          </Col>
        </Row>
      </div>

      <div>
        <Tabs fill defaultActiveKey="review" id="uncontrolled-tab-example">
          <Tab eventKey="review" title="리뷰">
            <Row style={{ marginTop: '1rem' }}>
              <Col span={6} offset={6}>
                <Button
                  type="primary"
                  style={diaryButtonStyle}
                  shape="round"
                  size={'small'}
                  onClick={showPageButton}
                >
                  다이어리
                </Button>
              </Col>
              <Col>
                <Button
                  style={detailButtonStyle}
                  shape="round"
                  size={'small'}
                  onClick={showPageButton}
                >
                  리뷰 상세
                </Button>
              </Col>
            </Row>
            {showPage ? <Diary /> : <ReviewCard />}
          </Tab>
          <Tab eventKey="likePlace" title="찜한 장소"></Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyPage;
