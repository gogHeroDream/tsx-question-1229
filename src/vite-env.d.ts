/*
 * @Description: 
 * @Autor: duym
 * @Date: 2022-09-26 17:46:22
 * @LastEditors: duym
 * @LastEditTime: 2022-09-26 18:23:26
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-cropperjs';