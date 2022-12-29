import * as Item from "./var";
import { getLocal,setLocal, setSLocal, getSLocal } from '@/utils/methods/utils';
// kctoken 
export const getKCToken = ()=> {
    return localStorage.getItem(Item.UKCTOKEN)
}
export const setKCToken = (value: string)=> {
    return localStorage.setItem(Item.UKCTOKEN, value)
}
export const removeKCToken = ()=> {
    return localStorage.removeItem(Item.UKCTOKEN)
}