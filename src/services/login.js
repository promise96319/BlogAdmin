import request from '@/utils/request';
import { HOST } from './config';

import { stringify } from 'querystring';
import { router } from 'umi';
import { getPageQuery } from '@/utils/utils';

export async function login(params) {
  return request(HOST + '/api/admin/login', {
    method: 'POST',
    data: params,
  }, false);
}

export const logout = () => {
  localStorage.removeItem('token');
  const { redirect } = getPageQuery(); // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login') {
    if (!redirect) {
      router.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
    } else {
      router.replace({pathname: '/user/login'})
    }
  }
};

// 注释
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
