import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
export const msgBoxConfirm= (params:any)=> {
    const {title, message, ...otherParams} = params;
    const _params:any= {...otherParams};
    _params.type??= 'info'
    _params.confirmButtonText ??= '确定';
    _params.cancelButtonText ??= '取消';
    _params.confirmButtonClass ??= 'el-box-message-custom-success';
    _params.cancelButtonClass ??= 'el-box-message-custom-cancel';
    _params.showConfirmButton ??= true;
    _params.showCancelButton ??= false;
    _params.dangerouslyUseHTMLString ??= false;
    _params.showClose ??= false;
    return ElMessageBox.confirm(message, title, _params);
}