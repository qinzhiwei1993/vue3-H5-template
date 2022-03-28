import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Toast } from 'vant'

/****
 * 错误类型
 * 1.http请求异常错误: 通过catch捕获
 * 2.功能相关错误(登录...): 通过返回接口判断code值
 * 3.其他服务端系统错误: 通过返回接口判断code值
 */

export default function (instance: AxiosInstance): void {
  // 请求拦截
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
  }, error => {

  })

  // 响应拦截
  let st: any = null
  instance.interceptors.response.use((res: AxiosResponse) => {
    const { code, message } = res.data

    // 功能相关错误
    switch (code) {
      case '100002':
        console.log('未登录，重新登录')
        return Promise.reject(res.data);
    }
    // 其他异常错误
    if (code !== "000000") {
      // 防止多个请求并发导致loading抖动
      if (st) {
        clearTimeout(st)
      }
      setTimeout(() => {
        Toast.fail({
          message: message
        })
      }, 500)
      return Promise.reject(res.data)
    }
    return res
  }, (error: AxiosError) => {
    // 防止多个请求并发导致loading抖动
    if (st) {
      clearTimeout(st)
    }
    setTimeout(() => {
      Toast.fail({
        message: error.message
      })
    }, 500)
    return Promise.reject(error)
  })
}
