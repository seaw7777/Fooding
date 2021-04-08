import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Input } from 'antd';

import './Review.css';
import { postUserReview } from '_api/Review';

function ReviewPage(props) {
  const { TextArea } = Input;
  const [Star, setStar] = useState(0);
  const [Accompany, setAccompany] = useState('');
  const [Contents, setContents] = useState('');
  const [fileArray, setfileArray] = useState([]);

  const store_id = props.location.state.store_id;
  const user_id = props.location.state.user_id;

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDay();
  let time = today.getTime();

  const handleAccompany = (id, value) => {
    let tagBtn = document.getElementById(id.slice(0, 10));
    let tagText = document.getElementById(id);
    tagBtn.style.backgroundColor = 'white';
    tagText.style.color = 'black';
    setAccompany(value);
  };
  const handleContent = event => {
    setContents(event.currentTarget.value);
  };
  const handleReview = event => {
    const fileLength = fileArray.length > 10 ? 10 : fileArray.length;
    let formData = new FormData();
    for (let i = 0; i < fileLength; i++) {
      formData.append('files', fileArray[i]);
    }
    formData.append('user_id', user_id);
    formData.append('store_id', parseInt(store_id));
    formData.append('contents', Contents);
    formData.append('star', Star);
    formData.append('Companion', Accompany);
    formData.append(
      'write_date',
      year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day) +
        'T00:00-0000',
    );

    postUserReview(formData)
      .then(res => {
        console.log(res);
        let ele = event.target;
        ele.classList.add('onclic');
        setTimeout(function changeclass() {
          ele.classList.remove('onclic');
          setTimeout(ele.classList.add('validate'));
        }, 2250);
        setTimeout(ele.classList.remove('validate'), 1250);
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      props.history.push('/main');
    }, 3500);
  };

  const onDrop = picture => {
    picture.preventDefault();
    setfileArray(picture.target.files);
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
      <div style={{ fontSize: '20px', textAlign: 'center' }}>
        동행자를 선택해주세요.(1명)
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span id="accompany1">
          <p
            id="accompany1-text"
            onClick={event => handleAccompany(event.target.id, '부모님')}
          >
            # 부모님
          </p>
        </span>
        <span id="accompany2">
          <p
            id="accompany2-text"
            onClick={event => handleAccompany(event.target.id, '친구')}
          >
            # 친구
          </p>
        </span>
        <span id="accompany3">
          <p
            id="accompany3-text"
            onClick={event => handleAccompany(event.target.id, '아이들')}
          >
            # 아이들
          </p>
        </span>
        <span id="accompany4">
          <p
            id="accompany4-text"
            onClick={event => handleAccompany(event.target.id, '반려동물')}
          >
            # 반려동물
          </p>
        </span>
      </div>
      <div style={{ width: '90%', margin: '2rem auto' }}>
        <TextArea
          showCount
          maxLength={500}
          rows={6}
          style={{ borderColor: 'black' }}
          onChange={handleContent}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '70%',
          margin: 'auto',
        }}
      >
        <input type="file" name="files" multiple onChange={onDrop} />
      </div>
      <div id="container">
        <button
          id="button"
          onClick={handleReview}
          style={{ marginTop: '1rem' }}
        ></button>
      </div>
    </div>
  );
}

export default ReviewPage;
