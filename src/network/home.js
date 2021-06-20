import {request} from './request'
import {request2} from './request2'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request2({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}