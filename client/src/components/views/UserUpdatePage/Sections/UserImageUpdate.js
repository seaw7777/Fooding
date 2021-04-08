import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Modal, Button, Image, message, Empty } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { SERVER } from 'Config.js';

function UserImageUpdate(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.checkit);
  const [imageUrl, setimageUrl] = useState('');
  console.log(props.userId);
  useEffect(() => {
    setimageUrl(
      `https://j4d107.p.ssafy.io/media/user/${props.userId}_profile.png`,
    );
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    window.location.replace('/mypage/update');
    setimageUrl(`cmedia/user/${props.userId}_profile.png`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeImage = picture => {
    picture.preventDefault();
    const fileArray = picture.target.files;
    const fileURLs = [];
    let file;
    const fileLength = fileArray.length > 10 ? 10 : fileArray.length;

    let formData = new FormData();
    if (fileURLs !== []) {
      formData.append('user_id', props.userId);
      for (let i = 0; i < fileLength; i++) {
        formData.append('file', fileArray[i]);
      }
    }

    axios
      .post(`${SERVER}accounts/change_profile_image/`, formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderImageUrl = () => {
    setimageUrl('/images/basicUser.png');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Badge
        offset={[-10, 55]}
        count={<EditOutlined style={{ fontSize: 20, marginRight: '-22' }} />}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          onClick={showModal}
          src={<img src={imageUrl} onError={renderImageUrl} />}
        />
      </Badge>
      <>
        <Modal
          title="이미지 변경"
          visible={isModalVisible}
          footer={[
            <Button key="back" onClick={handleCancel}>
              취소
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
            >
              확인
            </Button>,
          ]}
        >
          <input type="file" name="files" onChange={changeImage} />
        </Modal>
      </>
    </div>
  );
}

export default UserImageUpdate;
