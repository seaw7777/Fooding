import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '_actions/user_actions';
import residences from 'utils/areaInfo';
import EmailModal from './Sections/EmailModla';
import { Form, Input, Cascader, Select, Checkbox, Button, Steps } from 'antd';
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
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [size, setsize] = useState('middle');
  const { Step } = Steps;
  const [Email, setEmail] = useState('');
  const [NickName, setNickName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Address, setAddress] = useState([]);

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
    setNickName(event.currentTarget.value);
  };

  const onAddressHandler = event => {
    let address = event[0] + ' ' + event[1];
    console.log(address);
    setAddress(address);
  };

  const handlerSubmit = event => {
    event.preventDefault();
    // console.log(Email, Password, NickName, ConfirmPassword, Address);

    //비밀번호랑 비밀번호 확인 다를때
    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      nickname: NickName,
      password: Password,
      address: Address,
    };
    dispatch(registerUser(body)).then(response => {
      if (response.payload.success === 'success') {
        props.history.push('/login');
      } else {
        alert('회원가입에 실패 했습니다.');
      }
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div style={{ margin: '5% auto', padding: '2rem' }}>
      <Steps size="small" current={0} style={{ Color: '#faad14' }}>
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
          prefix: '86',
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
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input
            value={NickName}
            onChange={onNickNameHandler}
            style={{ width: '65%', margin: '0.5rem' }}
          />
        </Form.Item>
        <Button size={size}>랜덤선택</Button>

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
          <Cascader onChange={onAddressHandler} options={residences} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <div style={{ display: 'flex' }}>
            <EmailModal />

            <Button onClick={handlerSubmit} type="primary">
              다음
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
