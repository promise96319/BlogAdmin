import request from '@/utils/request';
import { HOST } from './config';

export async function getCarouselList() {
  return request(HOST + '/api/admin/carousels', {
    method: 'GET',
  });
}

/**
 * 更新或者增加轮播图
 * @param {*} params {title: '', image_src: '', ... [, id: 1]}
 */
export async function editCarousel(params) {
  return request(HOST + '/api/admin/carousels', {
    method: 'POST',
    data: params
  })
}

/**
 * 根据ID删除轮播图
 * @param {*} params {id: 1}
 */
export async function deleteCarouselByID(params) {
  return request(HOST + '/api/admin/carousels', {
    method: 'DELETE',
    data: params
  })
}