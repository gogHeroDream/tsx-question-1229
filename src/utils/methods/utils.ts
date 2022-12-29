/*
 * @Description: 公共方法封装
 * @Autor: duym
 * @Date: 2022-09-28 15:39:23
 * @LastEditors: duym
 * @LastEditTime: 2022-12-22 18:03:28
 */

import { keysOf } from 'element-plus/es/utils'
import { isFunction, isObject, isArray, isString, isNumber } from './types'
import { ElMessage, FormInstance } from 'element-plus'
import * as TMSCookies from '@/utils/methods/cookies'
import { ArrowLeft } from '@element-plus/icons-vue'
/**
 * @description: 时间格式化处理
 * @param {object|string|number} time
 * @param {string} cFormat
 * @return {string|null}
 */
type TTimeType = string | number | Date
interface IFormatType {
    [x: string]: number
}
interface IDealAjax {
    showErrorMsg?: boolean
    showSuccessMsg?: boolean
    errorMsg?: string
    successMsg?: string
}
export function parseTime(time: TTimeType, cFormat: string = '{y}-{m}-{d} {h}:{i}:{s}'): string {
    if (arguments.length === 0) {
        return ''
    }
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
            time = parseInt(time)
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj: IFormatType = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = cFormat.replace(/{([ymdhisa])+}/g, (result, key: keyof IFormatType): string => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return timeStr
}

/**
 * @description: 数据深拷贝处理
 * @param {object|Array} data
 * @return {object|Array}
 */
type dataType = [] | {}
export function cloneDeep(source: any): dataType {
    let target = source.constructor === Array ? [] : {};
    let names = Object.getOwnPropertyNames(source)//获取source的所有属性，包括不可遍历的；
    for (let i = 0; i < names.length; i++) {
        let desc:any = Object.getOwnPropertyDescriptor(source, names[i])//返回指定对象上一个自有属性对应的属性描述
        if (typeof (desc.value) === "object" && desc.value !== null) {
            let obj = cloneDeep(desc.value)
            Object.defineProperty(target, names[i], {
                configurable: desc.configurable, //不可删除
                enumerable: desc.enumerable,  //是否可遍历
                value: obj,
                writable: desc.writable,  //是否可写
            })
        } else {
            Object.defineProperty(target, names[i], desc)
        }
    }
    return target
}
// 去掉空格统一处理事件
export function deleteSpace(str: string): string {
    let result = []
    let strToArr = str.split(' ')
    for (let item of strToArr) {
        if (item) {
            result.push(item)
        }
    }
    return result.join('')
}

// 统一处理事件方法
export const dealAjax = async (
    fn: (param?: any) => void,
    params: any,
    { showErrorMsg, showSuccessMsg, errorMsg, successMsg }: IDealAjax = {
        showErrorMsg: true,
        showSuccessMsg: false,
        errorMsg: '',
        successMsg: ''
    }
) => {
    showErrorMsg ??= true
    showSuccessMsg ??= false
    errorMsg ??= ''
    successMsg ??= ''
    return new Promise(async (resolve, reject) => {
        if (!isFunction(fn)) {
            return reject('err--->传参有误')
        } else {
            try {
                const res: any = await fn(params)
                const result: any = res.result
                if (isObject(result) || isArray(result)) {
                    result.$base_data = { code: res.code, message: res.message }
                }
                if (res.code === '000000200') {
                    showSuccessMsg && ElMessage.success(successMsg || res.message)
                    return resolve(result)
                } else {
                    showErrorMsg && ElMessage.error(errorMsg || res.message)
                    return reject(result)
                }
            } catch (err) {
                ElMessage.error('error')
                return reject(err)
            }
        }
    })
}
// 防抖
export function debounce(callback: () => void, delay = 300) {
    let timer: null | NodeJS.Timeout = null
    let that: any, args: any
    return function (this: any, ..._args: any) {
        that = this
        args = _args
        if (timer !== null) clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(that, args)
        }, delay)
    }
}
// 节流
export function throttle(callback: () => void, delay = 300) {
    let lastTime = new Date().getTime()
    let nowTime,
        that,
        args: any,
        isInit = true
    return function (this: any, ..._args: any) {
        that = this
        args = _args
        nowTime = new Date().getTime()
        if (nowTime - lastTime > delay || isInit) {
            isInit = false
            callback.apply(that, args)
            lastTime = nowTime
        } else {
            return
        }
    }
}
// 重置信息
export function resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields()
}

// 转换手机号

export const replaceStr = (str: string, index: number, char: string) => {
    if (isString(str) && isString(char) && isNumber(index)) {
        return str.substring(0, index) + char + str.substring(index + 4)
    } else {
        return '****'
    }
}

// localStorage sessionStorage  获取与设置 转换数据存储与读取 主要处理对象json
export const setLocal = (key: string, value: any) => {
    if (isObject(value)) value = JSON.stringify(value)
    localStorage.setItem(key, value)
}
export const getLocal = (key: string) => {
    const res: any = localStorage.getItem(key)
    try {
        return JSON.parse(res)
    } catch (err) {
        return res
    }
}
export const setSLocal = (key: string, value: any) => {
    if (isObject(value)) value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
}
export const getSLocal = (key: string) => {
    const res: any = sessionStorage.getItem(key)
    try {
        return JSON.parse(res)
    } catch (err) {
        return res
    }
}

export const replaceCar = (data: commonType.IeType[], type: string) => {
    let str = ''
    if (data.length > 0 && Array.isArray(data))
        data.forEach((el) => {
            str += `${el[type]};`
        })
    return str || '--'
}

export const setLoginUserInfo = (v: any) => {
    // 并且设置 sessionId token
    v?.sessionId && TMSCookies.setSSID(v.sessionId)
    v?.token && TMSCookies.setToken(v.token)
}
export const removeLoginUserInfo = () => {
    TMSCookies.removeSSID()
    TMSCookies.removeToken()
    TMSCookies.removeSign()
}

// 对象数组去重
export const reMoval = <T>(arr: T, type: string): T => {
    let obj = {}
    if (Array.isArray(arr)) {
        arr = arr.reduce((item, next) => {
            obj[next[type]] ? '' : (obj[next[type]] = true && item.push(next))
            return item
        }, [])
    }
    return arr
}
// 跳转上一页
export const reback = (router: any) => {
    router.go(-1)
}
