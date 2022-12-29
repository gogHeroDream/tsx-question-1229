/*
 * @Description:
 * @Autor: duym
 * @Date: 2022-09-26 18:30:51
 * @LastEditors: duym
 * @LastEditTime: 2022-11-16 10:03:14
 */
import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
    RouteRecordRaw,
    RouteLocationNormalized,
    NavigationGuardNext
} from 'vue-router'

import NProgress from 'nprogress'

import { ElMessage } from 'element-plus'



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/test',
          },
          {
            path: '/test',
            name: 'Test',
            meta: {
              title: '测试'
            },
            component: () => import(/* webpackChunkName: "login" */ '@views/test/index.vue')
          },
    ]
})



router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    next();
})

export default router
