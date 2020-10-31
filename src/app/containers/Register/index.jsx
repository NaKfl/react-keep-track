import React, { memo } from 'react';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { sliceKey } from './slice';
import { Link } from 'react-router-dom';
import { StyledRegister } from './styles';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';

export const Register = () => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed } = handlers;
  const {} = selectors;

  return (
    <StyledRegister>
      <Form
        className="register-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="register-form-title">Register</Title>
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
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
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

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your Password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!',
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<CheckSquareOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item className="register-form-button register-form-button-local">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <span className="register-form-login">
          Or
          <Link to="/login"> Login </Link>
        </span>
      </Form>
    </StyledRegister>
  );
};

export default memo(Register);
