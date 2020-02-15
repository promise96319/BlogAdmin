import request from '@/utils/request';
import { HOST } from './config';

export async function getTagList() {
  return request(HOST + '/api/admin/tags', {
    method: 'GET',
  });
}

/**
 * 更新或者增加tag
 * @param {*} params {... [, id: 1]}
 */
export async function editTag(params) {
  return request(HOST + '/api/admin/tags', {
    method: 'POST',
    data: params
  })
}