import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '_actions/user_actions';
import TasteAvatar from './Sections/TasteAvatar';
import { Typography, Button, Steps } from 'antd';
import 'antd/dist/antd.css';
import { convertLegacyProps } from 'antd/lib/button/button';

function RegisterTastePage(props) {
  const { Title } = Typography;
  const { Step } = Steps;
  const dispatch = useDispatch();

  const [TasteLi, setTasteLi] = useState([]);
  const [TasteList, setTasteList] = useState([
    { name: '한식', link: 'https://picsum.photos/100/100/?random' },
    { name: '분식', link: 'https://source.unsplash.com/random' },
    { name: '일식', link: 'https://source.unsplash.com/random' },
    { name: '카페', link: 'https://picsum.photos/100/100/?random' },
    { name: '중식', link: 'https://picsum.photos/100/100/?random' },
    { name: '양식', link: 'https://picsum.photos/100/100/?random' },
    { name: '술집', link: 'https://picsum.photos/100/100/?random' },
    { name: '베이커리', link: 'https://picsum.photos/100/100/?random' },
    { name: '햄버거', link: 'https://picsum.photos/100/100/?random' },
  ]);
  //Taste Avatar에서 선택한 리스트 받아오는 함수
  const handleFilters = filters => {
    const newTasteLi = [...filters];
    // console.log(newTasteLi);
    setTasteLi(newTasteLi);
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(props.location.state.nickName);

    if (TasteLi.length > 4) {
      console.log(TasteLi);
      let body = {
        email: props.location.state.email,
        nickname: props.location.state.nickname,
        password: props.location.state.password,
        address: props.location.state.address,
        taste: TasteLi,
      };
      dispatch(registerUser(body)).then(response => {
        if (response.payload.success === 'success') {
          props.history.push('/login');
        } else {
          alert('회원가입에 실패 했습니다.');
        }
      });
    } else {
      alert('5개 이상 선택해주세요.');
    }
  };

  return (
    <div style={{ margin: '5% auto', padding: '2rem' }}>
      <Steps size="small" current={1}>
        <Step title="회원가입" />
        <Step title="취향선택" />
        <Step title="완료" />
      </Steps>
      ,
      <Title level={4} style={{ textAlign: 'center' }}>
        당신의 취향을 알려주세요(최소 5개)
      </Title>
      <TasteAvatar
        list={TasteList}
        handleFilters={filters => handleFilters(filters)}
      />
      <a href={`/`}>
        <Button
          type="primary"
          value="defalut"
          onClick={handleSubmit}
          style={{
            display: 'flex',
            margin: '2rem auto',
            background: 'orange*5',
            borderColor: 'orange-5',
          }}
        >
          완료
        </Button>
      </a>
    </div>
  );
}

export default RegisterTastePage;
