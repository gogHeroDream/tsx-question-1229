
import http from '@api/index'
import { pageObj } from '@utils/common'
import { dealAjax, cloneDeep } from '@/utils/methods/utils';
import { isArray, isString, isNumber, isFunction } from '@/utils/methods/types';

// 初始化分页
export function pageSwtich<T, M extends commonType.Iconfig>(checkObj: T, config: M) {
    //返回数据滴响应
    const loading = ref<boolean>(true)
    const dataState = ref<commonType.IeType[]>([])
    const pageQuery = reactive<TableSpace.Ioptions>({
        maxHeight: config.height || 540,
        ...pageObj,
    })
    const state = reactive({
        hasPagination: config.hasPagination?? true,
        listDataFrom: config.listDataFrom?? ['page','list'],
        totalDataFrom: config.totalDataFrom ?? 'totalPageNumber',
    })
    let loadingTimer: NodeJS.Timeout
    const getCheckObj = ()=> {
        if(typeof checkObj === 'function') {
            return checkObj()
        }else {
            return {...checkObj}
        }
    }
    // 查询条件
    const submitInfo = () => {
        pageQuery.pageConfig.currentPage = 1
        pageQuery.pageConfig.pageSize = 10
        getList(getCheckObj())
    }
    // pageSize或者currentPage改变触发
    const handlePaginationChange = (page: number, pageSize: number) => {
        pageQuery.pageConfig.currentPage = page
        pageQuery.pageConfig.pageSize = pageSize
        getList(getCheckObj())
    }
    const clearTimer = ()=> {
        if(loadingTimer) clearTimeout(loadingTimer)
    }
    // 获取外协运力列表
    const getList: <C>(checkObj: C) => void = async (checkObj) => {
        loading.value = true
        const params:any = {...checkObj}
        if(state.hasPagination) {
            params.curPagerNo = pageQuery.pageConfig.currentPage
            params.pageSize = pageQuery.pageConfig.pageSize
        }
        const result:any = await dealAjax(http[config.module][config.name], params)
        clearTimer()
        loadingTimer = setTimeout(() => {
            loading.value = false
        }, 500)
        let data:any = cloneDeep(result);
        let total:any = cloneDeep(result);
        state.listDataFrom.forEach((el, index)=> { 
            data= data?.[el]
            if(isString(state.totalDataFrom)) {
                if(index<state.listDataFrom.length-1) {
                    total = total?.[el]
                } else {
                    total = total?.[state.totalDataFrom as string]
                }
            }
        })

        dataState.value = (data && isArray(data)) ? data: []
        // pageConfig.pageConfig.total = result?.page?.rowsCount || 0
        pageQuery.pageConfig.total = (isNumber(total)&&isFinite(total)) ? total: 0 
        console.log(result)
    }
    onMounted(() => {
        getList(getCheckObj())
        console.log('hooks slider mounted --->', loading.value)
    })
    onBeforeUnmount(()=> {
        clearTimer()
    })
    return { pageQuery, handlePaginationChange, getList, dataState, submitInfo, loading }
}
