import request from '@/utils/request';
import { HOST } from './config';

export async function getArticleList(params) {
  return request(HOST + '/api/admin/articles', {
    method: 'GET',
    params: params
  });
}

export async function editArticle(params) {
  return request(HOST + '/api/admin/articles', {
    method: 'POST',
    data: params
  });
}

/**
 * 更新或者增加轮播图
 * @param {*} params {... [, id: 1]}
 */

// export async function editCategory(params) {
//   return request(HOST + '/api/admin/articles', {
//     method: 'POST',
//     data: params
//   })
// }
