import request from '@/utils/request';
import authorize from '@/components/Authorized/Secured';
import { HOST } from '@/services/config'


export async function auth() {
  return request(HOST + '/api/admin/auth', {
    method: 'GET',
  })
}







// 注释掉
export async function query() {
  // return request('/api/users');
}
export async function queryCurrent() {
  // return request('/api/currentUser');
}
export async function queryNotices() {
  // return request('/api/notices');
}
