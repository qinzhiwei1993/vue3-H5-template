import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'



export default function (instance: AxiosInstance): void {
  // 请求拦截
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 请求参数打印
    console.log('============= request')
    console.log(config)
    return config
  })

  // 响应拦截
  instance.interceptors.response.use((res: AxiosResponse) => {
    // 响应结果打印
    console.log(res)
    console.log('response ====================')
    return res
  })
}
