import http from '@/libs/splat.request'


export const condition = (params: {}) => {
  return http.request({
    url: '/diagnosis/condition',
    params,
    method: 'GET'
  })
}

