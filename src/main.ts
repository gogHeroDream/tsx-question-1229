/*
 * @Description: main中相关文件配置
 * @Autor: duym
 * @Date: 2022-09-26 18:30:51
 * @LastEditors: duym
 * @LastEditTime: 2022-11-18 18:44:28
 */

import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

import router from './router'
import directives from './directives'
import 'element-plus/dist/index.css'

import { loadAllPlugins } from './plugins'

const app = createApp(App)
// 创建实例
const setupAll = async () => {

    // 加载所有插件
    loadAllPlugins(app)

    app.use(router).use(directives)

    // 注册elementplus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }

    app.mount('#app')
}
setupAll()
