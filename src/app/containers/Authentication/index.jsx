import React, { memo } from 'react';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks, { useMessage } from './hooks';
import { sliceKey } from './slice';
import { Link } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import {
  StyledLogin,
  StyledGoogleButton,
  StyledFacebookButton,
} from './styles';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export const Login = () => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed, handleLoginService } = handlers;
  const { status } = selectors;
  useMessage();

  return (
    <StyledLogin>
      <Form
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="login-form-title">Login</Title>
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
          <Button
            type="primary"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            Login
          </Button>
        </Form.Item>
        <GoogleLogin
          clientId="518404312823-ibh4ph48o4p3ad7b6f4jd4eoiv6m4o7l.apps.googleusercontent.com"
          render={renderProps => (
            <StyledGoogleButton
              className="login-form-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Google Login
            </StyledGoogleButton>
          )}
          buttonText="Google Login"
          onSuccess={receivedData =>
            handleLoginService({
              service: 'google',
              data: receivedData && receivedData.accessToken,
            })
          }
          onFailure={res => console.log(res)}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="703530593917463"
          fields="name,email,picture"
          // onClick={(res)=>console.log(res)}
          callback={receivedData =>
            handleLoginService({
              service: 'facebook',
              data: receivedData && receivedData.accessToken,
            })
          }
          render={renderProps => (
            <StyledFacebookButton
              className="login-form-button"
              onClick={renderProps.onClick}
            >
              Facebook Login
            </StyledFacebookButton>
          )}
        />
        <span className="login-form-register">
          Or
          <Link to="/register"> Register </Link>
        </span>
      </Form>
    </StyledLogin>
  );
};

export default memo(Login);
