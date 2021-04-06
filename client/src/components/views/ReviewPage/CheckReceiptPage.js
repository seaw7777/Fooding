import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import ImageUploader from 'react-images-upload';
import Column from 'antd/lib/table/Column';

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

  return (
    <div>
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
