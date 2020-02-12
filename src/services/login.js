import request from '@/utils/request';

const HOST = 'http://localhost:7001';

export async function login(params) {
  return request(HOST + '/api/admin/login', {
    method: 'POST',
    data: params,
  });
}

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
