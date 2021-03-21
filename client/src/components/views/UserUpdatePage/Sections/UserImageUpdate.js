import React, { useState } from 'react';
import { Avatar, Badge, Modal, Button, Upload, message } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { AiOutlineUpload } from 'react-icons/ai';

function UserImageUpdate(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.checkit);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const prop = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      // 파일 한 개만 업로드 되도록 해야함
      // 확인 눌렀을 때 부모 컴포넌트 데이터 넘기고 이미지 업로드 되야함
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Badge
        offset={[-10, 55]}
        count={<EditOutlined style={{ fontSize: 20, marginRight: '-22' }} />}
      >
        <Avatar size={64} icon={<UserOutlined />} onClick={showModal} />
      </Badge>
      <>
        <Modal
          title="이미지 변경"
          visible={isModalVisible}
          footer={[
            <Button key="back" onClick={handleCancel}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              확인
            </Button>,
          ]}
        >
          <Upload {...prop}>
            <Button>
              <AiOutlineUpload />
              &nbsp; Click to Upload
            </Button>
          </Upload>
        </Modal>
      </>
    </div>
  );
}

export default UserImageUpdate;
