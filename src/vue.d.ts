

// 为app添加全局属性类型，支持ts校验

import { Store } from 'vuex/types/index'
import { AxiosInstance } from 'axios'

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<any>; // this.$store
    $http: AxiosInstance
  }
}
