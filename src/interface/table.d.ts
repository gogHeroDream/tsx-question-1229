/*
 * @Description: 表格组件类型定义
 * @Autor: duym
 * @Date: 2022-11-02 16:24:00
 * @LastEditors: duym
 * @LastEditTime: 2022-12-27 17:37:19
 */
// table表格TS类型定义
declare namespace TableSpace {
	type VNodeChild = import('vue').VNodeChild
	type Ttype = 'selection' | 'index' | 'expand' | 'image' | "date"
    type Tsize = 'large' | 'default' | 'small'
    type Talign = 'center' | 'left' | 'right'
    type Tcommand = string | number
    type TdateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM'
    type Torder = 'ascending' | 'descending'
    interface Ibutton {
        name: string,
        command: Tcommand,
        type?: 'primary' | 'success' | 'warning' | 'danger' | 'info',
    }
    interface Isort {
        prop: string
        order: Torder
        init?: any
        silent?: any
    }
    interface Icolumn {
        // 对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮
        type?: Ttype,
        fix?: boolean | string,
        label?: string,
        prop?: string,
        slot?: string
        width?: string,
        align?: Align,
        dateFormat?: DateFormat // 显示在页面中的日期格式，简单列举了几种格式， 可自行配置
        showOverflowTooltip?: boolean,
        buttons?: Ibutton[],
        headerSlot?: string, // 自定义表头插槽名字
        render?: (row?: string|any, index: number) => VNodeChild // 渲染函数，渲染这一列的每一行的单元格
        sortable?: boolean | 'custom' // 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
    }
    interface Ioptions {
        height?: string | number,
        // Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
        stripe?: boolean, // 是否为斑马纹 table
        maxHeight?:string | number, // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
        size?: Tsize // Table 的尺寸
        showHeader?: boolean // 是否显示表头,
        tooltipEffect?: 'dark' | 'light' // tooltip effect 属性
        showPagination?: boolean, // 是否展示分页器
        pageConfig: Ipagination, // 分页器配置项，详情见下方 pageConfig 属性,
   	 	rowStyle?: ({ row, rowIndex }) => stirng | object // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
 	 	defaultSort?: Isort // 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序。
 	 	rowKey?: string // 行数据的 Key，用来优化 Table 的渲染。
    }
    interface Ipagination {
        total: number, // 总条目数
        currentPage?: number, // 当前页数，支持 v-model 双向绑定
        pageSize?: number, // 每页显示条目个数，支持 v-model 双向绑定
        pageSizes?: number[], // 每页显示个数选择器的选项设置
        layout?: string, // 组件布局，子组件名用逗号分隔
        background?: boolean, // 是否为分页按钮添加背景色
    }
    interface TableProps {
        tableData: Array<object> // table的数据
        columns:Icolumn[] // 每列的配置项
        options?: Ioptions
    }
}