import request from '@/utils/request';
import { HOST } from './config';

export async function getCategoryList() {
  return request(HOST + '/api/admin/categories', {
    method: 'GET',
  });
}

/**
 * 更新或者增加轮播图
 * @param {*} params {... [, id: 1]}
 */
export async function editCategory(params) {
  return request(HOST + '/api/admin/categories', {
    method: 'POST',
    data: params
  })
}