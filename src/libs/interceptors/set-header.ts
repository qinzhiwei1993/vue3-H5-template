import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'



export default function (instance: AxiosInstance): void {
  // 请求拦截
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.params = config.params || {}
    config.params.rn = Math.random()
    const cityCode = config.params['cityCode'] || (config.data && config.data['cityCode'])
    if (cityCode) {
      config.headers.cityCode = cityCode
    }
    config.headers['platform'] = 'splat'
    return config
  })

  // 响应拦截
  instance.interceptors.response.use((res: AxiosResponse) => {
    // 响应结果打印
    return res
  })
}
