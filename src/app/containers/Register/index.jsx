import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks, { useMessage } from './hooks';
import { sliceKey, reducer } from './slice';
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
import { ACTION_STATUS } from 'utils/constants';

export const Register = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed } = handlers;
  const { status } = selectors;
  useMessage();

  return (
    <StyledRegister>
      <Form
        className="register-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="register-form-title">Register</Title>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
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
            { min: 6, message: 'Must be minimum 6 characters!' },
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

                return Promise.reject('Passwords do not match!');
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
          <Button
            type="primary"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
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
