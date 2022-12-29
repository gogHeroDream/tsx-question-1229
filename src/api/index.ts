/*
 * @Description:
 * @Autor: duym
 * @Date: 2022-11-01 15:42:28
 * @LastEditors: duym
 * @LastEditTime: 2022-11-01 15:42:38
 */
const moduleApi = (import.meta as any).globEager('./modules/*.ts')
const keys = Object.keys(moduleApi)
const http = {}
keys.forEach((key: string) => {
    ;(http as any)[key.replace('./modules/', '').replace(/(\.\/|\.ts)/g, '')] = moduleApi[key]
})
export default http as any
