import React, { useState } from 'react';

import { Modal, Button, Input } from 'antd';
import 'antd/dist/antd.css';

function EmailModla() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        onClick={showModal}
        style={{
          display: 'flex',
          margin: '0px 1rem 0px 0px',
          backgroundColor: '#faad14',
          borderColor: '#faad14',
        }}
      >
        인증하기
      </Button>
      <Modal
        title="이메일 인증"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>인증번호를 입력해주세요.</p>
        <Input style={{ width: '80%' }} />
      </Modal>
    </div>
  );
}

export default EmailModla;
