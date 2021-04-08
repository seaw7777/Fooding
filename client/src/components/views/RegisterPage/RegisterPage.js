import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import residences from 'utils/areaInfo';
import NicknameObj from 'utils/NickName';
import { Form, Input, Cascader, Select, Button, Steps, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterPage = props => {
  const [form] = Form.useForm();
  const [size, setsize] = useState('middle');
  const { Step } = Steps;
  const [Email, setEmail] = useState('');
  const [NickName, setNickName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Address, setAddress] = useState([]);
  const { Title } = Typography;

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onNickNameHandler = event => {
    const newNickNameFirst = NicknameObj['first'];

    let RandomeFirst =
      newNickNameFirst[
        Math.floor(Math.random() * (newNickNameFirst.length - 1))
      ];

    const newNickNameSecond = NicknameObj['second'];
    let RandomeSecond =
      newNickNameSecond[
        Math.floor(Math.random() * (newNickNameSecond.length - 1))
      ];
    const RandomeNickname = RandomeFirst + RandomeSecond;
    setNickName(RandomeNickname);
  };

  const onAddressHandler = event => {
    let address = event[0] + ' ' + event[1];
    setAddress(address);
  };

  const renderButton = () => {
    if (
      Email === '' ||
      NickName === '' ||
      Password === '' ||
      Address[0] === undefined
    ) {
      return (
        <Button
          disabled
          style={{
            backgroundColor: '	#FFA07A',
            borderColor: '#FFA07A',
            position: 'absolute',
            right: '0',
          }}
        >
          다음
        </Button>
      );
    } else {
      return (
        <Link
          to={{
            pathname: '/register/taste',
            state: {
              email: Email,
              nickname: NickName,
              password: Password,
              address: Address,
            },
          }}
        >
          <Button
            style={{
              backgroundColor: '#FFA07A',
              borderColor: '#FFA07A',
              position: 'absolute',
              right: '0',
            }}
          >
            다음
          </Button>
        </Link>
      );
    }
  };

  return (
    <div style={{ margin: '5% auto', padding: '2rem' }}>
      <Steps size="small" current={0}>
        <Step title="회원가입" />
        <Step title="취향선택" />
        <Step title="완료" />
      </Steps>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['경북', '구미'],
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            value={Email}
            onChange={onEmailHandler}
            style={{ margin: '0.5rem' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password value={Password} onChange={onPasswordHandler} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              whitespace: true,
            },
          ]}
        >
          <div style={{ display: 'flex' }}>
            <Title level={5} style={{ width: '80%' }}>
              {NickName}
            </Title>
            <Button
              className="nickname-btn"
              size={size}
              onClick={() => onNickNameHandler()}
              style={{
                backgroundColor: '#FFA07A',
                borderColor: '#FFA07A',
              }}
            >
              랜덤선택
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name="residence"
          label="사는 지역"
          rules={[
            {
              type: 'array',
              required: true,
              message: 'Please select your habitual residence!',
            },
          ]}
        >
          <Cascader
            onChange={onAddressHandler}
            options={residences}
            defaultValue={['경북', '구미']}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>{renderButton()}</Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
