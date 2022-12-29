<template>
    <div class="wb veh-main">
        <div id="searchTop">
            <h3>test 组件 debugger  没问题</h3>
            <h5>下面的data-picker 组件 debugger 有问题 不能正常debugger 进去， 停在了 export default 引用位置</h5>
            <tms-data-picker></tms-data-picker>
            <tms-number-input></tms-number-input>
        </div>
    </div>
</template>
<script setup lang="ts">
const a = ref(1)
onMounted(()=> {
    debugger
    console.log('test')
})
</script>
<style lang="less" scoped>
.veh-main{
    #searchTop{
        margin:20px;
    }
}
</style>
