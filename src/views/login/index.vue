<template>
  <div id="login"></div>
  <xesLoginVue2 appId="mdfwxt" businessChannel="mdfwxt" :wxUnionid="wxUnionid" :wxAuthUrl="wxAuthUrl" :isSwitchAccount="isSwitchAccount" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// vue2 in vue3
import xesLogin from '@xes/xes-business-lib/lib/login'
import '@xes/xes-business-lib/lib/style/login.css'
// 在vue3中兼容使用vue2
import { Vue2InVue3 } from '@efox/emp-vuett'
const xesLoginVue2 = Vue2InVue3(xesLogin, 'login')
export default defineComponent({
  components: {
    xesLoginVue2,
  },
  setup() {},
  data() {
    const redirectUrl = encodeURIComponent(
      'http://one-dev.speiyou.cn:8082/vue3-vite/login'
    )
    let wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4825ade40bfc434e&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    return {
      wxAuthUrl,
      isSwitchAccount: true,
      wxUnionid: '' as any
    }
  },
  mounted() {
    const { query } = this.$route
    if (query.code) {
      this.isSwitchAccount = true
      this.wxUnionid = query.code || ''
    }
  },
})
</script>
