/*
 * @Description: 公共类型
 * @Autor: duym
 * @Date: 2022-11-10 15:30:52
 * @LastEditors: duym
 * @LastEditTime: 2022-12-27 11:44:31
 */
declare namespace commonType { 
    // 弹框操作
    type Tdetail = {
        rejectRes?: string //弹出是否需要展示其他备注
        orDetail?: boolean //弹出如存在表单是否置灰
        title: string  //title类型
    }
    // 弹框v-model类型
    interface Idialog {
        dialogType: boolean
    }
    interface IeType {
        [key: string]: any
    }
    interface Iconfig {
        height?: number
        module: string
        name: string
        hasPagination?: boolean
        listDataFrom?:string[]
        totalDataFrom?:string[]|string
    }
}