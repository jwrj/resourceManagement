<template>
	
	<div>
		
		<Button type="primary" @click="open">新建文件夹</Button>
		
		<div style="padding: 10px 0;display: flex;align-items: center;">
			
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
			
			<Row
			v-for="item in newFileData"
			:key="item.name"
			@click.native="clickFolder(item,$event)"
			@dblclick.native="dblclickFolder(item)"
			class="fileList"
			:class="{active: item.name === activeName}"
			>
				<Col span="10" class="fileList-name">
					<Icon style="margin-right: 8px;" :type="iconType(item.type).icon || ''" size="28" :color="iconType(item.type).color || ''" />
					<span>{{item.name}}</span>
				</Col>
				<Col span="7">200 KB</Col>
				<Col span="7">2018-9-27 2:20</Col>
			</Row>
			
		</div>
		
			
		<Modal v-model="modal">
			<p slot="header">新建文件夹</p>
	        <Input v-model="folderName" placeholder="文件夹名称" />
	        <div slot="footer">
	            <Button type="primary" @click="addFolder">确定</Button>
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
		currentRouteName: {
			type: String,
			required: true
		}
	},
    data () {//数据
        return {
        	
        	fileData: {
        		children: [
        			{
	        			name: '文件夹1',
	        			type: 'folder',
	        			children: [
	        				{
		        				name: '子文件夹1',
		        				type: 'folder',
			        			children: [],
			        			files: []
	        				},
	        				{
		        				name: '子文件夹2',
		        				type: 'folder',
			        			children: [
			        				{
				        				name: '子文件夹2-1',
				        				type: 'folder',
					        			children: [],
					        			files: []
			        				}
			        			],
			        			files: []
	        				}
	        			],
	        			files: [
			        		{
								id: 1,
								name: '图片123.jpg',
								type: 'jpg',
							},
			        		{
								id: 2,
								name: '文本666.txt',
								type: 'txt',
							},
	        			],
	        		},
	        		{
						name: '文件夹2',
						type: 'folder',
		    			children: [],
		    			files: [
		    				{
								id: 2,
								name: '文本888.txt',
								type: 'txt',
							}
		    			]
					},
        		],
        		files: [
    				{
						id: 1,
						name: '图片1.png',
						type: 'png',
					},
	        		{
						id: 2,
						name: '图片2.jpg',
						type: 'jpg',
					},
	        		{
						id: 3,
						name: '文本.txt',
						type: 'txt',
					},
    			],
        	},
        	
        	modal: false,
        	
        	count: 1,
        	
        	folderName: '',
        	
        	currentName: 0,
        	
        	pathHistory: [''],//路径记录
        	
        	breadcrumb: [//面包屑导航
        		{
        			name: '全部文件',
        			path: '/'
        		}
        	],
        	
        	newFileData: [],
        	
        	activeName: '',
        	
        	hideRetu: true,
        	
        }
    },
    methods: {//方法
    	
    	returns(){//返回上级
    		
    		this.$router.go(-1);
    		
    	},
    	
    	open(){//打开弹窗
    		
    		this.modal = true;
    		
    	},
    	
    	addFolder(){//新建文件夹
    		console.log(this.folderName);
    	},
    	
    	clickFolder(current,e){//单击文件
			this.currentName = current.name;
    		this.activeName = current.name;
    	},
    	
    	dblclickFolder(current){//双击文件
    		
    		if(current.children && current.files){//双击了文件夹
    			
    			this.pathHistory.push(current.name);//记录路径
    			
    			this.$router.push({
		    		name: this.currentRouteName,
		    		query: {
		    			path: this.pathHistory.join('/')
		    		}
		    	});
		    	
    		}else{//双击了文件
    			
    		}
	    	
    	},
    	
    	iconType(type){
    		
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
        
        setShowFileData(routeQuery, fileData){//设置要显示的文件数据
        	
        	let newArr = [];
        	
        	if(routeQuery.path && routeQuery.path != ''){
        		
	        	let pathArr = routeQuery.path.split('/');
	    		
	    		let currentOpenFolder = pathArr[pathArr.length-1];
	    		
	    		let isFolder1 = false;
	    		let isFolder2 = true;
	    		
	    		let recursion = (obj) => {
	      			
	      			if(obj.children && obj.children.length > 0){
	      				
	      				obj.children.forEach(item => {
	      					
	      					if(item.name === currentOpenFolder){
	      						
	      						isFolder1 = true;
	      						
	        					newArr.push(...item.children,...item.files);
	        					
	      					}else{
	      						
	      						isFolder2 = false;
	      						
	      					}
	      					
	      					recursion(item);
	      				
	      				});
	      				
	      			}
	      			
	      		}
	      		
	      		recursion(fileData);
	      		
	      		if(!isFolder1 && !isFolder2){
	      			console.log('文件夹不存在');
	      		}
        		
        	}
      		
      		return newArr;
        	
        }
    	
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	
    	'$route'(to){
    		
    		let newArr = [];
    		
    		if(!to.query.path || to.query.path === '/'){//根目录
    			
    			this.hideRetu = false;
    			
    			newArr.push(...this.fileData.children,...this.fileData.files);
    			
    			this.pathHistory = [''];
    			
    		}else{
    			
    			this.hideRetu = true;
    			
    			newArr = this.setShowFileData(to.query, this.fileData);
    			
	      		this.pathHistory = to.query.path.split('/');
	      			
    		}
    		
      		this.newFileData = newArr;
      		
    	},
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	let newArr = [];
    	
    	if(!this.$route.query.path || this.$route.query.path === '/'){//根目录
    		
    		this.hideRetu = false;
    		
      		newArr.push(...this.fileData.children,...this.fileData.files);
    		
    	}else{
    		
    		this.hideRetu = true;
    		
    		newArr = this.setShowFileData(this.$route.query, this.fileData);
    		
    	}
    	
    	this.newFileData = newArr;
    	
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
</style>