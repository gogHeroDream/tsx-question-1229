/*
 * @Description:公共对象配置
 * @Autor: duym
 * @Date: 2022-11-10 18:20:22
 * @LastEditors: duym
 * @LastEditTime: 2022-12-26 17:23:56
 */
export const elObj: commonType.IeType = {
    type: 'warning',
    confirmButtonText: '确认',
    draggable: true
}

export const pageObj = {
    showPagination: true,
    pageConfig: {
        background: true,
        total: 0, // 总条目数
        currentPage: 1, // 当前页数，支持 v-model 双向绑定
        pageSize: 10 // 每页显示条目个数，支持 v-model 双向绑定
    }
}

export const authstatus = [
    {
        label: '待认证',
        value: 1
    },
    {
        label: '认证通过',
        value: 2
    },
    {
        label: '认证失败',
        value: 3
    },
    {
        label: '取消认证',
        value: 4
    }
]

export const receiveStatus = [
    {
        label: '已确认',
        value: 1
    },
    {
        label: '待确认',
        value: 2
    },
    {
        label: '已拒绝',
        value: 3
    }
]

export const searchStatus = [
    {
        label: '司机手机号',
        id: 'driverMobile'
    },
    {
        label: '车牌号',
        id: 'plateNumber'
    }
]
