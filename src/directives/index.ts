/*
 * @Description: 自定义指令
 * @Autor: duym
 * @Date: 2022-09-27 15:53:45
 * @LastEditors: duym
 * @LastEditTime: 2022-11-01 14:54:43
 */

import { App } from 'vue'

// 指令对象
const directiveObj: any = {

}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directiveObj).forEach((el) => {
      // 注册自定义指令
      app.directive(el, directiveObj[el])
    })
  }
}
export default directives
