import * as Item from "./var";
import { getLocal,setLocal, setSLocal, getSLocal } from '@/utils/methods/utils';
// 记住手机号
export const getTelRemember = ()=> {
    return localStorage.getItem(Item.LOGIN_TEL_REMEMBER)
}
export const setTelRemember = (value: string)=> {
    return localStorage.setItem(Item.LOGIN_TEL_REMEMBER, value)
}
export const removeTelRemember = ()=> {
    return localStorage.removeItem(Item.LOGIN_TEL_REMEMBER)
}
// 记住手机号的号码
export const getTelLogin= ()=> {
    return localStorage.getItem(Item.LOGIN_TEL)
}
export const setTelLogin = (value: string)=> {
    return localStorage.setItem(Item.LOGIN_TEL, value)
}
export const removeTelLogin = ()=> {
    return localStorage.removeItem(Item.LOGIN_TEL)
}

// 验证码登录倒计时
export const getLoginCodeCountdown= ()=> {
    return sessionStorage.getItem(Item.LOGIN_CODE_COUNTDOWN)
}
export const setLoginCodeCountdown = (value: string)=> {
    return sessionStorage.setItem(Item.LOGIN_CODE_COUNTDOWN, value)
}
export const removeLoginCodeCountdown = ()=> {
    return sessionStorage.removeItem(Item.LOGIN_CODE_COUNTDOWN)
}

// 登录用户
export const getUsername= ()=> {
    return localStorage.getItem(Item.LOGIN_USERNAME)
}
export const setUsername = (value: string)=> {
    return localStorage.setItem(Item.LOGIN_USERNAME, value)
}
export const removeUsername = ()=> {
    return localStorage.removeItem(Item.LOGIN_USERNAME)
}
//当前currentindex  登录方式 0 密码  1验证码
export const getCurrent= ()=> {
    return sessionStorage.getItem(Item.LOGIN_CURRENT)
}
export const setCurrent = (value: string)=> {
    return sessionStorage.setItem(Item.LOGIN_CURRENT, value)
}
export const removeCurrent = ()=> {
    return sessionStorage.removeItem(Item.LOGIN_CURRENT)
}

// 获取登录权限
export const getPermissionKeys= ()=> {
    return localStorage.getItem(Item.LOGIN_PERMISSION_KEYS)
}
export const setPermissionKeys = (value: string)=> {
    return localStorage.setItem(Item.LOGIN_PERMISSION_KEYS, value)
}
export const removePermissionKeys = ()=> {
    return localStorage.removeItem(Item.LOGIN_PERMISSION_KEYS)
}

//验证码内容
export const getVerifyCodeObj = ()=> {
    return getSLocal(Item.LOGIN_VERIFY_CODE_OB)
}
export const setVerifyCodeObj = (value:any)=> {
    return setSLocal(Item.LOGIN_VERIFY_CODE_OB, value)
}
export const removeVerifyCodeObj = ()=> {
    return sessionStorage.removeItem(Item.LOGIN_VERIFY_CODE_OB)
}


