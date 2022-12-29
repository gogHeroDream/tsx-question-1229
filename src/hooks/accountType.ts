
import http from '@api/index'
import { useUserInfo } from '@store'
type TEvent<T> = {
    formGrabOrder?: T
    freight?: string | number
    serverFee?: string | number
}
// 初始抢单类型
export function account() {
    const userType = ref(6)
    const serverFee = ref('')
    const freight = ref('')
    const getUserInfo = useUserInfo()
    const route = useRoute()
    const getInfo = async () => {
        const userObj = await getUserInfo.dispatchUserInfo()
        userType.value = userObj?.identityTypeList ? userObj?.identityTypeList[0] : 6
        if (userType.value === 9) {
            const { result } = await http.sendOrder.getOrderDetail({ id: route.params.invoiceId || '' })
            serverFee.value = result?.serverFee || ''
            freight.value = result?.freight || ''
        }
    }
    const setApiData: <T>(formGrabOrder: T) => TEvent<T> = (formGrabOrder) => {
        let obj =
            userType.value === 6
                ? { ...formGrabOrder, freight: freight.value }
                : { ...formGrabOrder, freight: freight.value, serverFee: serverFee.value }
        return obj
    }
    onMounted(getInfo)
    return {
        userType,
        serverFee,
        freight,
        setApiData
    }
}
