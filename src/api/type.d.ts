/*
 * @Description: 
 * @Autor: duym
 * @Date: 2022-09-26 19:58:28
 * @LastEditors: duym
 * @LastEditTime: 2022-10-18 11:48:47
 */
import { AxiosRequestConfig } from "axios";


interface IUser {
  name: string;
  pasword: string;
}
 
// 定制业务相关的网络请求响应格式， T 是具体的接口返回类型数据
interface ICustomSuccessData<T> {
  status: number;
  statusText: string;
  message?: string;
  data: T;
  [keys: string]: unknown;
}
 
/**
 *
 */
interface IRequestA {
  <T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<CustomSuccessData<T>>;
}

/**
 * 接口fetchData 类型
 */

type TResult = {
  pageTotal: number;
  list: Array<F>;
};
interface IF { 
  id: number;
	name: string;
	money: string;
	state: string;
	date: string;
	address: string;
}

/**
 * 接口getDict 类型 
 */
type TResultDict = {
  list: { 
    value: string | number,
    text: string,
    key?:string  | number
  }[]
}