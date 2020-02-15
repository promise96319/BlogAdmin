import { Alert, Checkbox, Form, Input, Button, Icon, message } from 'antd';
import React, { useState } from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import styles from './style.less';
import { login } from '../../../services/login';
import { getPageQuery } from '@/utils/utils';

const Login = props => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');

  const handleSubmit = async () => {
    const res = await login({ username, password });
    
    if (res.status && res.status != 200) { return }

    if (res.loginSuccess) {
      localStorage.setItem("token", res.token)
      
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      
      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }
      router.replace(redirect || '/');
    } else {
      message.error('用户名密码错误');
    }
  };

  return (
    <div className={styles.main}>
      <Form className="login-form">
        <Form.Item>
          <Input
            // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
