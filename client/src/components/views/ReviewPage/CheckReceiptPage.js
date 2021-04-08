import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import ImageUploader from 'react-images-upload';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './Review.css';

function CheckReceiptPage(props) {
  const [picture, setpicture] = useState([]);
  const [ocr, setOcr] = useState('영수증을 등록해주세요.');
  const [Next, setNext] = useState(false);

  const worker = createWorker({
    logger: m => console.log(m),
  });

  const doOCR = async () => {
    setOcr('영수증 인식 중입니다...');
    await worker.load();
    await worker.loadLanguage('kor');
    await worker.initialize('kor');
    const {
      data: { text },
    } = await worker.recognize(picture[picture.length - 1]);
    console.log(text);

    console.log(text.includes('매 장') || text.includes('매장'));
    if (text.includes('매 장') || text.includes('매장')) {
      setOcr('리뷰 작성하러 GoGo!!');
      setNext(true);
    } else {
      setOcr('영수증 인식에 실패했습니다 ㅜㅜ');
    }
  };

  const onDrop = picture => {
    let newpicture = picture;
    setpicture(newpicture);
    console.log(picture[picture.length - 1]);
    setOcr('인증 버튼을 눌러주세요.');
  };

  const span = document.getElementsByClassName('close');

  const clickbtn = () => {
    console.log(span);
    const modal = document.getElementById('myModal');
    console.log(modal);
    modal.style.display = 'block';
  };
  const clickSpan = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  };
  window.onclick = event => {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  return (
    <div>
      <div id="myModal" className="modal" onClick={clickSpan}>
        <div className="modal-content">
          <span className="close">&times;</span>
          <p style={{ fontSize: '15px' }}>
            이미지는 이렇게! 매장이 잘 보이게 찍어주세요.
          </p>
          <img src="/images/스타벅스 영수증.png"></img>
        </div>
      </div>
      <QuestionCircleOutlined
        id="myBtn"
        onClick={clickbtn}
        style={{
          fontSize: '23px',
          position: 'absolute',
          right: 0,
          marginRight: '16px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '30%',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>{ocr}</h3>

        <ImageUploader
          withIcon={true}
          buttonText="영수증 등록"
          onChange={onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          label="인증할 영수증을 선택하세요."
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {Next ? (
          <Link
            to={{
              pathname: '/review/post',
              state: {
                store_id: props.location.state.store_id,
                user_id: props.location.state.user_id,
              },
            }}
          >
            <Button
              style={{
                backgroundColor: '#faad14',
                borderColor: '#faad14',
              }}
            >
              다음
            </Button>
          </Link>
        ) : (
          <Link to="/review/post">
            <Button disabled>다음</Button>
          </Link>
        )}
        {Next ? (
          <Button onClick={doOCR} disabled>
            인증
          </Button>
        ) : (
          <Button
            onClick={doOCR}
            style={{
              backgroundColor: '#faad14',
              borderColor: '#faad14',
            }}
          >
            인증
          </Button>
        )}
      </div>
    </div>
  );
}

export default CheckReceiptPage;
