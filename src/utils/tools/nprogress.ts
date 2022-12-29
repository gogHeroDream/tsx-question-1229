/*
 * @Description: 引入进度条，编辑属性
 * @Autor: duym
 * @Date: 2022-09-23 10:14:09
 * @LastEditors: duym
 * @LastEditTime: 2022-10-18 11:56:05
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

interface INpType {
    easing: string,
    speed: number,
    showSpinner: boolean,
    trickleSpeed: number,
    minimum: number
}
let npConfig: INpType = {
    easing: 'ease',//动画方式
    speed: 1000,//递增进度的速度
    showSpinner: false,//是否显示加载ico
    trickleSpeed: 200,//自动递增间隔
    minimum: 0.3 //初始化时的最小百分比
}
// 设置进度条
NProgress.configure(npConfig)

const npMethod = {
    start: () => {
       NProgress.start()
    },
    close: () => {
       NProgress.done()
    }
}
export default npMethod