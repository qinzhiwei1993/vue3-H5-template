import { createRouter, createWebHistory } from "vue-router";

import routes from './routes'

console.log(import.meta.env)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from) => {
 // 登录状态拦截
 console.log('路由拦截')
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router;
