<script lang="tsx">
import { reactive, toRefs } from "vue"
export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        label: {
            type: String,
        },
        clearable: {
            type: Boolean,
            default: true,
        }
    },

    setup(props:any){
        const state = reactive({
            inputVal: ''
        })
        return {...toRefs(state)} 
    },
    render() {
        // const chanteInput = (value:string)=>{
        //     this.$emit('input', value)
        // }
        const input= ()=> {
            this.inputVal=this.inputVal.replace(/[^\d]/g,'')
            this.$emit('keyup', this.inputVal)
        }
        const inputDomRender = () => <el-input onInput={input} vModel={this.inputVal} clearable={this.clearable} placeholder={this.placeholder} />
        return this.label ? (
                <div>
                    <span>{this.label}</span> { inputDomRender() }
                </div>
            ): (inputDomRender())  
    }
}
</script>
<style scoped>
</style>
