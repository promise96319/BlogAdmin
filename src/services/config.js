import { stringify } from 'querystring';
import { router } from 'umi';
import { getPageQuery } from '@/utils/utils';

export const HOST = "http://localhost:7001"

/**
 * 检查是否具有权限
 * 返回值： 没有权限返回空, 有权限，返回应该添加的 header 值
 */
export const authHeader = () => {
  let token = localStorage.getItem('token')
  
  if (token) {
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  } else {
    return {}
  }
}