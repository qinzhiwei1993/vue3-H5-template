/**
 * 不包含ploatform
 */

 import HttpRequest from './axios'
 import { runEnv } from '../utils'
 import config from '../config'
 const env = runEnv()
 const baseURL = config.baseURL[env]
 const platform = '/SPLAT/'

 sessionStorage.setItem('currentEnv', env)
 const Axios = new HttpRequest({
   baseURL: baseURL + platform,
   withCredentials: true, // 跨域请求时发送 cookies
   timeout: 30000 // request timeout
 })

 export default Axios
