import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '_actions/user_actions';
import TasteAvatar from './Sections/TasteAvatar';
import { Typography, Button, Steps } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sections/Register.css';

function RegisterTastePage(props) {
  const { Title } = Typography;
  const { Step } = Steps;
  const dispatch = useDispatch();

  const [TasteLi, setTasteLi] = useState([]);
  const [TasteList, setTasteList] = useState([
    { name: '한식', link: '/images/taste/한식.png' },
    { name: '분식', link: '/images/taste/분식.jpg' },
    { name: '일식', link: '/images/taste/일식.jpg' },
    { name: '카페', link: '/images/taste/카패.png' },
    { name: '중식', link: '/images/taste/중식.png' },
    { name: '양식', link: '/images/taste/양식.jpg' },
    { name: '술집', link: '/images/taste/술집.jpg' },
    { name: '베이커리', link: '/images/taste/베이커리.jpg' },
    { name: '패스트푸드', link: '/images/taste/햄버거.jpg' },
  ]);

  const handleFilters = filters => {
    const newTasteLi = [...filters];
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
      console.log(body);
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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link
          to={{
            pathname: '/register',
            state: {
              email: props.location.state.email,
              nickname: props.location.state.nickname,
              password: props.location.state.password,
              address: props.location.state.address,
            },
          }}
        >
          <Button
            type="primary"
            value="defalut"
            style={{
              display: 'flex',
              margin: '2rem auto',
              background: 'orange*5',
              borderColor: 'orange-5',
              backgroundColor: '#faad14',
            }}
          >
            뒤로가기
          </Button>
        </Link>
        <a href={`/main`}>
          <Button
            type="primary"
            value="defalut"
            onClick={handleSubmit}
            style={{
              display: 'flex',
              margin: '2rem auto',
              backgroundColor: '#faad14',
              borderColor: '#faad14',
            }}
          >
            완료
          </Button>
        </a>
      </div>
    </div>
  );
}

export default RegisterTastePage;
