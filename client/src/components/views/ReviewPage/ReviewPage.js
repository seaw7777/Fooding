import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Input, Button } from 'antd';
import ImageUploader from 'react-images-upload';
import './Review.css';
import { postUserReview } from '_api/Review';

function ReviewPage(props) {
  const { TextArea } = Input;
  const [Star, setStar] = useState(0);
  const [Accompany, setAccompany] = useState('');
  const [Contents, setContents] = useState('');
  const store_id = props.location.state.store_id;
  const user_id = props.location.state.user_id;
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  console.log(month.length);
  let day = today.getDay();

  const handleAccompany = value => {
    setAccompany(value);
  };
  const handleContent = event => {
    setContents(event.currentTarget.value);
  };
  const handleReview = () => {
    // console.log(year + '-' + month + '-' + day);
    // console.log(Contents);
    let body = {
      user_id: user_id,
      store_id: parseInt(store_id),
      contents: Contents,
      star: Star,
      write_date:
        year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day),
      // Companion: Accompany,
    };
    console.log(body);
    postUserReview(body)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', margin: '2rem auto' }}>
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          style={{ display: 'flex', margin: ' auto' }}
        >
          <Rating
            name="simple-controlled"
            Star={Star}
            size="large"
            onChange={(event, newValue) => {
              setStar(newValue);
            }}
          />
        </Box>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span id="accompany">
          <p id="accompany-text" onClick={() => handleAccompany('부모님')}>
            # 부모님
          </p>
        </span>
        <span id="accompany">
          <p id="accompany-text" onClick={() => handleAccompany('친구')}>
            # 친구
          </p>
        </span>
        <span id="accompany">
          <p id="accompany-text" onClick={() => handleAccompany('아이들')}>
            # 아이들
          </p>
        </span>
        <span id="accompany">
          <p id="accompany-text" onClick={() => handleAccompany('반려동물')}>
            # 반려동물
          </p>
        </span>
      </div>
      <div style={{ width: '90%', margin: '3rem auto' }}>
        <TextArea
          showCount
          maxLength={500}
          rows={6}
          style={{ borderColor: 'black' }}
          onChange={handleContent}
        />
      </div>
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="사진 업로드"
          // onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      </div>
      <Button onClick={handleReview}>완료</Button>
    </div>
  );
}

export default ReviewPage;
