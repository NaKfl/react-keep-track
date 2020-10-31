import React, { memo } from 'react';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { sliceKey } from './slice';
import { Link } from 'react-router-dom';
import {
  StyledLogin,
  StyledGoogleButton,
  StyledFacebookButton,
} from './styles';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed } = handlers;
  const {} = selectors;

  return (
    <StyledLogin>
      <Form
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="login-form-title">Login</Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          className="login-form-password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="login-form-forgot">
          <a href="">Forgot password ?</a>
        </Form.Item>

        <Form.Item className="login-form-button login-form-button-local">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <StyledGoogleButton className="login-form-button">
          Google Login
        </StyledGoogleButton>

        <StyledFacebookButton className="login-form-button">
          Facebook Login
        </StyledFacebookButton>
        <span className="login-form-register">
          Or
          <Link to="/register"> Register </Link>
        </span>
      </Form>
    </StyledLogin>
  );
};

export default memo(Login);