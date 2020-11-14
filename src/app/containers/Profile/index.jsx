import {
  CheckSquareOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks, { useMessage } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledProfile } from './styles';

export const Profile = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { setIsDisabled, onFinish } = handlers;
  const { info, isDisabled, form, loading } = selectors;
  useMessage();

  return (
    <StyledProfile>
      <Title>Profile </Title>
      <Form
        className="register-form"
        form={form}
        onFinish={onFinish}
        initialValues={info ? info : {}}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Name"
            disabled={isDisabled}
          />
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
          <Input prefix={<MailOutlined />} placeholder="Email" disabled />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[{ min: 6, message: 'Must be minimum 6 characters!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            disabled={isDisabled}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
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
            disabled={isDisabled}
          />
        </Form.Item>

        <Form.Item className="register-form-button register-form-button-local">
          <Button
            type="primary"
            htmlType="submit"
            disabled={isDisabled}
            loading={loading}
          >
            Submit
          </Button>
          <Button className="edit-button" onClick={() => setIsDisabled(false)}>
            Edit
          </Button>
        </Form.Item>
      </Form>
    </StyledProfile>
  );
};

export default memo(Profile);
