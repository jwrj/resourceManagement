<template>
	
	<div @click="outermostClick">
		
		<div>
			<Button type="primary" size="small" icon="md-add" @click.stop="open">新建文件夹</Button>&nbsp;
			<Button type="primary" size="small" icon="md-add" @click.stop="openWjy">添加附件</Button>
		</div>
		
		<div class="file-breadcrumb">
			<Button @click="returns" v-if="hideRetu" size="small" type="text" icon="md-return-left" style="margin-right: 10px;">
				返回上级
			</Button>
			<Breadcrumb>
				<template v-for="(item,index) in breadcrumb">
			        <BreadcrumbItem :to="index != breadcrumb.length-1 ? '?path='+item.path : ''">{{item.name}}</BreadcrumbItem>
				</template>
			</Breadcrumb>
		</div>
		
		<div>
			
			<Row class="fileList">
				<Col span="10">名称</Col>
				<Col span="7">大小</Col>
				<Col span="7">日期</Col>
			</Row>
			<div style="overflow-y: auto;height: 400px;padding-bottom: 100px;">
				<Row
				v-for="item in newFileData"
				:key="item.title"
				@click.native.stop="clickFolder(item,$event)"
				@dblclick.native="dblclickFolder(item)"
				class="fileList"
				:class="{active: item.title === activeName}"
				>
					<Col span="10" class="fileList-name">
						<Icon style="margin-right: 8px;" :type="iconType('txt').icon || ''" size="28" :color="iconType(item.type).color || ''" />
						<span>{{item.title}}</span>
					</Col>
					<Col span="7">200 KB</Col>
					<Col span="7">2018-9-27 2:20</Col>
				</Row>
			</div>
			
		</div>
		
		<Modal v-model="modal">
			<p slot="header">新建文件夹</p>
			<Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="90">
				<FormItem label="文件夹名称" prop="folderName">
			        <Input v-model="formData.folderName" clearable placeholder="输入名称" />
				</FormItem>
			</Form>
	        <div slot="footer">
	            <Button @click="modal = false">取消</Button>
	            <Button type="primary" @click="addFolder('formInstance')">确定</Button>
	        </div>
	    </Modal>

	</div>
	
</template>

<script>

export default {
	name: 'fileManage',
	components:{//组件模板
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
// 		actionId: {//活动ID
// 			type: [Number, String],
// 			required: true
// 		},
		
		value: {
			type: Object,
			default: () => {return {}}
		},
		
	},
    data () {//数据
        return {
        	
        	fileData: {//文件夹数据
        		children: [],
        		files: [],
        	},
        	
        	formData: {
        		folderName: '',
        	},
        	
        	ruleData: {
				folderName: [
					{ required: true, message: '请输入文件夹名称', trigger: 'blur' }
				]
			},
        	
        	modal: false,//新建文件夹弹窗
        	
        	currentFolder: {},//当前选中的文件夹数据
        	
        	currentFile: {},//当前选中的文件数据
        	
        	pathHistory: ['0'],//路径记录
        	
        	breadcrumb: [//面包屑导航
        		{
        			name: '全部文件',
        			path: '/'
        		}
        	],
        	
        	newFileData: [],//新的文件数据
        	
        	activeName: '',//选中的文件名称
        	
        	hideRetu: false,//返回上级按钮是否显示
			fold:[],
			firstFold:[],
			childrenFold:[],
			currentF:0
        	
        }
    },
    methods: {//方法
// 		setShowFileData(fileData){//设置当前要显示的文件数据
// 			let newArr = [];
// 			let isFolder1 = false;
// 			let isFolder2 = true;
// 			let recursion = (obj) => {
// 				
// 				 obj.forEach(item => {
// 				 	if(item.id == id){
// 				 		isFolder1 = true;
// 				 		newArr.push(...item.children,...item.files);
// 				 		this.currentFolder = oldArr[i];
// 				 	}else{
// 				 		isFolder2 = false;
// 				 	}
// 				 	recursion(item);
// 				 });
// 				
// 			}
// 			recursion(fileData);
// 			if(!isFolder1 && !isFolder2){
// 				console.log('文件夹不存在');
// 			}
// 			return newArr;
// 		},

    	init(){//初始化
        	let newArr = [];
	    	// if(this.pathHistory.length <= 1){//根目录
	    		this.hideRetu = false;
	    		this.currentFolder = {};
	      		newArr.push(...this.firstFold);
// 	    	}else{
// 	    		this.hideRetu = true;
// 	    		// newArr = this.setShowFileData(id, this.fileData);
// 				newArr = this.setShowFileData(this.childrenFold);
// 	    	}
	    	this.newFileData = newArr;
        },
    	getFileData(){
			$ax.getAjaxData('service/Folder/index',{}, res => {				
			if(res.status == 200){
				this.fold = res.data;
			
				let newFiles = [];
				let newChild = [];
				this.fold.forEach(item =>{
					if(item.level == 0){
						newFiles.push(item);
						item.children = [];
					}else{
						newChild.push(item);
						item.children = [];
					}
				})
// 				newFiles.forEach(file=>{
// 					newChild.forEach(child=>{
// 						if(file.id == child.parent_id)
// 						file.children.push(child)
// 					})
// 				})
                this.firstFold = newFiles;
                this.childrenFold = newChild;
                this.init();

			}
			});	
			
			
		},
    	returns(){//返回上级
    		if(this.pathHistory.length >= 2){
    			let superiorId = this.pathHistory[this.pathHistory.length - 2];
    			this.pathHistory.splice(this.pathHistory.length-1, 1);
    			this.init(superiorId);
    		}
    	},
    	
    	clickFolder(current,e){//单击事件
//     		if(current.children && current.files){//单击了文件夹
//     			this.currentFolder = current;
//     			this.pathHistory.push(current.id);
//     			this.getFileData(this.actionId, current.id, current);
//     		}else{//单击了文件
//     			this.currentFile = current;
//     			this.activeName = current.name;//选中样式
//     		}


//           this.childrenFold.forEach(child =>{
// 			  this.currentFile = current;
// 			  if(current.id == child.parent_id){
// 				  current.children.push(child);
// 			  }
// 		  })
          let id = current.id;
		  let arr =[];
		  this.childrenFold.forEach(item=>{
			  if(id == item.parent_id){
				  arr.push(item)
			  }
		  })
		  this.currentF = id;
		  this.currentFolder = current;
		  this.newFileData = arr;
		  this.activeName = current.title;
		  
    	},
    	
    	dblclickFolder(current){//双击事件
    		if(current.children && current.files){//双击了文件夹
    			
    		}else{//双击了文件
    			
    		}
    	},
    	
    	open(){//打开弹窗
    		this.modal = true;
    	},
    	
    	openWjy(){//打开文件云
		   console.log('打开文件云')
    		this.setAddFile();
    	},
    	
    	outermostClick(){//最外边的点击事件
    		this.activeName = '';
    		this.currentFile = {};
    	},
 setAddFolder(parent_id, title, fileData){//设置新建文件夹提交数据
 
 	$ax.getAjaxData('service/Folder/add', {
 		parent_id: parent_id,
 		title: title
 	}, res => {
 		if(res.status == 200){
 			this.modal = false;
			this.getFileData();
 		}
 	});
 },   	

    	setAddFile(){//设置添加附件提交数据
          let parent_id = this.currentF;
		  let data ={
					id: 18,
					title: "第二层0-7的小儿子",
					user_id: 10,
					path: "0-7",
					parent_id: parent_id,
					level: 1,
					bpath: "0-7-8"
            }
			this.childrenFold.push(data);
			this.clickFolder(this.currentFolder)
			console.log(this.childrenFold)
			},
    	
    	addFolder(name){//新建文件夹
    		this.$refs[name].validate((valid) => {
    			if(valid){
// 		    		if(this.pathHistory.length <= 1){//根目录
// 		    			this.setAddFolder( 0, this.formData.folderName);
// 		    		}else{
// 		    			this.setAddFolder(this.currentFolder.id, this.formData.folderName);
// 		    		}
            this.setAddFolder(this.currentFolder.id, this.formData.folderName);
    			}
    		});
    	},
 	
    	iconType(type){//显示图标类型
    		let obj = {};
    		if(type === 'folder'){
    			obj = {
    				icon: 'md-folder',
    				color: '#ffcd1b'
    			}
    		}else if(type === 'txt'){
    			obj = {
    				icon: 'md-document',
    				color: '#19be6b'
    			}
    		}else if(type === 'jpg' || type === 'png'){
    			obj = {
    				icon: 'md-image',
    				color: '#5cadff'
    			};
    		}
        	return obj;
        },
        
    },
    computed: {//计算属性
    	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
		this.getFileData()
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
}
</script>

<style scoped lang="less">
.fileList{
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	border-bottom: 1px solid #e8eaec;
	cursor: pointer;
	-moz-user-select:none;
	-webkit-user-select: none;
	-ms-user-select: none;
	.fileList-name{
		display: flex;
		align-items: center;
	}
}
.fileList:hover{
	background-color: #ebf7ff;
	border-bottom: 1px solid #cfecff;
}
.active{
	background-color: #ebf7ff;
	border-bottom: 1px solid #cfecff;
}
.file-breadcrumb{
	margin: 10px 0;
	padding: 4px 0;
	display: flex;
	align-items: center;
}
</style>