import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'vant'


export default function (instance: AxiosInstance): void {
  // 请求拦截
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  })

  // 响应拦截
  let st: any = null
  instance.interceptors.response.use((res: AxiosResponse) => {
    // 防止多个请求并发导致loading抖动
    if (st) {
      clearTimeout(st)
    }
    st = setTimeout(() => {
      Toast.clear()
    }, 500)
    return res
  }, error => {
    console.log('error', error)
  })
}
