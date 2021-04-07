import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Modal, Button, Image, message, Empty } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { AiOutlineUpload } from 'react-icons/ai';
import axios from 'axios';
import { SERVER } from 'Config.js';

function UserImageUpdate(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.checkit);
  const [imageUrl, setimageUrl] = useState('');

  useEffect(() => {
    setimageUrl(
      `http://j4d107.p.ssafy.io:8000/media/user/${props.userId}_profile.png`,
    );
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // setimageUrl(
    //   `http://j4d107.p.ssafy.io:8000/media/user/${props.userId}_profile.png`,
    // );
    window.location.replace('/mypage/update');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const prop = {
  //   name: 'file',
  //   action: '//jsonplaceholder.typicode.com/posts/',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     // 파일 한 개만 업로드 되도록 해야함
  //     // 확인 눌렀을 때 부모 컴포넌트 데이터 넘기고 이미지 업로드 되야함
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

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
        // 이건 로컬용이다.
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // .post(`${SERVER}accounts/change_profile_image/`, formData, {
      //   // 이건 로컬용이다.
      //   header: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
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
          src={<img src={imageUrl} alt="없음" onError={renderImageUrl} />}
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
            <Button key="submit" type="primary" onClick={handleOk}>
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
