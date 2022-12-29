<script lang="tsx" name="TmsDataPicker">
import { reactive, ref, toRefs  } from 'vue'
import { isArray } from '../../utils/methods/types'
export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        label: {
            type: String
        },
        clearable: {
            type: Boolean,
            default: true
        },
        shortcuts: {
            type: Array,
            default: () => []
        }
    },

    setup(props: any) {
        debugger
        // const state = reactive({
        //     inputVal: ''
        // })
        const state = reactive({
            value2: '',
            defaultTime2: [new Date(2000, 1, 1, 12, 0, 0), new Date(2000, 2, 1, 8, 0, 0)], // '12:00:00', '08:00:00'
            scopeShortcuts: [
                {
                    text: 'Last week',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        return [start, end]
                    }
                },
                {
                    text: 'Last month',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                    }
                },
                {
                    text: 'Last 3 months',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        return [start, end]
                    }
                }
            ]
        })
        const mergeShortcuts = computed(() => {
            debugger
            console.log(1)
            if (props.shortcuts && isArray(props.shortcuts) && props.shortcuts.length > 0) {
                return props.shortcuts
            } else {
                return state.scopeShortcuts
            }
        })

        return { ...toRefs(state), mergeShortcuts }
    },
    render() {
        debugger
        console.log(2)
        alert(1)
        return (
            <el-date-picker
                vModel={this.value2}
                type="datetimerange"
                shortcuts={this.mergeShortcuts}
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                default-time={this.defaultTime2}
            />
        )
    }
}
</script>
<style scoped></style>
