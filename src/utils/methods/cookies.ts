/*
 * @Description: cookie操作
 * @Author: duym
 * @Date: 2022-09-02 17:56:11
 * @LastEditTime: 2022-09-02 22:38:48
 * @LastEditors: duym
 * @FilePath: /kc-fe-fmgt/src/utils/cookies.ts
 */
import Cookies from 'js-cookie'


const TOKEN = 'token'
const SESSIONID = 'SESSIONID'
const NONCE = 'NONCE'
const TIMESTAMP ='TIMESTAMP'
const SIGN = 'SIGN'
// token 
export const getToken = () => Cookies.get(TOKEN)
export const setToken = (token: string) => Cookies.set(TOKEN, token)
export const removeToken = () => Cookies.remove(TOKEN)
// sessionId 
export const setSSID = (sessionId: string) => Cookies.set(SESSIONID, sessionId)
export const getSSID = () => Cookies.get(SESSIONID)
export const removeSSID = () => Cookies.remove(SESSIONID)

// nonce 
export const getNonce = () => Cookies.get(NONCE)
export const setNonce = (nonce: string) => Cookies.set(NONCE, nonce)
export const removeNonce = () => Cookies.remove(NONCE)

// timestamp
export const getTimestamp = () => Cookies.get(TIMESTAMP)
export const setTimestamp = (timestamp:string) => Cookies.set(TIMESTAMP, timestamp)
export const removeTimestamp = () => Cookies.remove(TIMESTAMP)


// sign 
export const getSign = () => Cookies.get(SIGN)
export const setSign = (sign: string) => Cookies.set(SIGN, sign)
export const removeSign = () => Cookies.remove(SIGN)



