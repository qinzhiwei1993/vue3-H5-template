
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import Cookie from 'js-cookie'
import interceptors from './interceptors'

const userInfo = Cookie.get('columbusUserInfo')


class HttpRequest {

  private baseURL?: string
  private withCredentials?: boolean
  private timeout?: number

  constructor(config: AxiosRequestConfig) {
    this.baseURL = config.baseURL
    this.withCredentials = config.withCredentials
    this.timeout = config.timeout
  }

  getInsideConfig(): AxiosRequestConfig {
    return {
      baseURL: this.baseURL,
      withCredentials: this.withCredentials,
      timeout: this.timeout,
      headers: {
        // 'X-Ca-platform': Platform,
        platform: 'splat',
        creator: userInfo ? JSON.parse(userInfo).id : null,
        empNo: userInfo ? JSON.parse(userInfo).id : null
      }
    }
  }

  request(options: AxiosRequestConfig): AxiosPromise<unknown> {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    interceptors(instance)
    return instance(options)
  }
}
export default HttpRequest
