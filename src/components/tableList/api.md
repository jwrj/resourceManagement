
***tableList

modalTitle {String} '标题' 对话框标题

tableColumns {Array} [必传] 表格列表表头数据

tableData {Array} [] 表格列表数据


***事件

@on-btn-click {data：返回表格当前行数据,和当前handle的参数} 点击按钮时触发

@on-poptip-ok {data：返回表格当前行数据,和当前handle的参数} 点击气泡提示确定按钮时触发

@on-poptip-cancel {data：返回表格当前行数据,和当前handle的参数} 点击气泡提示取消按钮时触发

@select-change {data：已选数据} 选择改变时触发

***handle

name {String} '按钮' 按钮名称

modalShow {Boolean} false 是否打开对话框

poptipOpen {Boolean} false 是否打开气泡提示

button_props {Object} {} 按钮的api属性

poptip_props {Object} {} 气泡提示的api属性
