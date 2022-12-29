/*
 * @Description: 搜索组件类型定义
 * @Autor: duym
 * @Date: 2022-11-07 13:57:42
 * @LastEditors: duym
 * @LastEditTime: 2022-11-18 11:29:10
 */
// 搜索组件TS类型定义
declare namespace searchFormType{ 
    //搜索组件配置项类型 
    interface IsearchType {
        label?: string, //是否展示label
        type: string, //表单类型
        searchKey: string, //表单绑定值
        width?:string,
        optionItems?: Ioption
        placeholder?: string,
        searchShow?: boolean,
        interval?: boolean,
        //组件占比
        layout?: string,
        disabled?: boolean,
        // 自定义下拉框label
        optionLabel?: string,
        // 自定义下拉框value
        optionValue?: string,
    }
    // select下拉选类型
    interface Ioption { 
        valueType?: string, //是否从接口获取option
        option?:IOpList //是否默认添加options
    }
    interface IsearchData { 
        [key:string]:any
    }
    // options数据类型
    interface IOpList {
        value: number //选项值
        label: string //选项展示name
        type?: string | number
    }
}