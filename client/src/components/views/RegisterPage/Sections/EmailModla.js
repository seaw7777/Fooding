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
    <>
      <Button type="primary" onClick={showModal}>
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
    </>
  );
}

export default EmailModla;
