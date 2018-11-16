<template>
	
	<div>
	  <div >
		  <Tag color="blue" @click.native.stop="add(0)">添加子文件夹</Tag>
	  	<div v-for="item in folderList"
		:key="item.title" >
			<div :class="{active: item.id === activeId.id}" class="fileRow"  :style="{marginLeft:item.level*5+'0px'}">
				<span v-if="!item.child"><Icon type="md-folder" />{{item.title}}</span>
				<span v-if="item.child"><Icon type="md-document" color="skyblue"/>{{item.title}}</span>
				<div v-if="!item.child">
<!-- 					<Tag color="blue" @click.native.stop="add(item.id)">添加子文件夹</Tag>
					<Tag color="blue" @click.native.stop="del(item)">删除</Tag>
					<Tag color="blue"  @click.native.stop="edit(item)">编辑</Tag> -->
					<Tag color="blue"   @click.native.stop="af(item)">添加附件</Tag>
				</div>
				</div>
			</div>
	  </div>
		<Modal v-model="addModel" @on-ok="addFolder">
			<p slot="header">新建文件夹</p>
				<Form  :label-width="90">
					<FormItem label="文件夹名称">
								<Input v-model="folderName" clearable placeholder="输入名称" />
					</FormItem>
				</Form>
		</Modal>
<!-- 		<Modal v-model="editModel" @on-ok="editFolder">
			<p slot="header">编辑文件名</p>
				<Form  :label-width="90">
					<FormItem label="文件夹名称">
								<Input v-model="folderName" clearable placeholder="输入名称" />
					</FormItem>
				</Form>
		</Modal> -->
		<Modal v-model="fileModel" @on-ok="addFile">
			<p slot="header">我的文件云目录</p>
			<Row>
				<Col span="6">
					<div v-for="file in fileList"
					:key="file.title" style="display: flex;flex-direction: column;">
						<div class="fileLeft" 
						@click="choiceFile(file,$event)" :style="{marginLeft:file.level*5+'0px'}">
							<span style="line-height: 30px;padding: 5px;" :class="{active: file.id === activeFile}"><Icon type="md-folder" />{{file.title}}</span>
						</div>
					</div>
				</Col>
				<Col span="18" style="overflow: hidden;" v-if="fileCloud.length>0">
					<div v-for="(cloud,index) in fileCloud" :key="index"
					 @click="choiceCloudFile(cloud,$event)"
					 :class="{active: cloud.id === activeCloudF}">
						<Icon :type="iconType(cloud.extension)" size="58"></Icon>{{cloud.source_name}}
					</div>
				</Col>
			</Row>
		</Modal>	
	</div>
	
</template>

<script>
export default {
	name: 'file',
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
	},
    data () {//数据
        return {
        	folderList:[],
			addModel:false,
			editModel:false,
			fileModel:false,
			folderName:'',
			foldDetail:[],
			currentFold:[],
			showChild:false,
			fileList:[],
			activeId: '',//选中的文件名称
			activeFile:'',
			activeCloudF:'',
			fileCloud:'请选择一个文件夹' ,//文件云文件列表
			currentCloudFile:{},
			uploadFile:[] //要传递给父组件的数据
        }
    },
    methods: {//方法
	    getFolderList(){
			$ax.getAjaxData('service/Folder/index', {}, res => {	 	
						if(res.status == 200){
						this.folderList = res.data;
						}
						});
		},
		add(current){
			  this.addModel = true;
			  this.activeId = current;
		},
// 		edit(current){
// 			this.editModel = true;
// 			this.activeId = current.id;		
// 		},
// 		del(current){		
// 			$ax.getAjaxData('service/Folder/del', {id:current.id}, res => {	 	
// 			if(res.status == 200){	
// 			   this.$emit('changeFold');
// 			   this.selectChild(current)
// 			  }
// 			});
// 			
// 		},
		af(current){
			this.fileModel = true;
			this.activeId = current;		
			$ax.getAjaxData('service/Oauth/get_user_dir', {}, res => {	 	
			if(res.status == 200){	
				this.fileList = res.data;
			}
			});
		},
		addFile(){  //添加文件到页面
		   if(this.currentCloudFile){
			   let arr = {
				   id:this.currentCloudFile.id,
				   title:this.currentCloudFile.source_name,
				   user_id:this.currentCloudFile.user_id,
				   parent_id: this.activeId.id,
				   level:this.activeId.level+1,
				   child:'child',
				   bpath:`${this.activeId.bpath}-${this.currentCloudFile.id}`
			   }
			        let flag = false;
                    for(let i=0;i<this.folderList.length;i++){
						if(this.folderList[i].id == arr.id){
							alert('该文件已添加！');
							return;
						}else{
							flag = true;
						}
					}
					  if(flag == true){
						  let index = this.folderList.indexOf(this.activeId);
						  this.folderList.splice(index+1, 0, arr);
						  // this.uploadFile.push(arr.id); //添加一个 提交一个
						  let list = {
						  	folder_id:this.activeId.id,
						  	id:arr.id,
						  	}
						  this.$emit('uploadFile',list);
						  
					  }
					
		   }
		   
		},
// 		editFolder(id){
// 			$ax.getAjaxData('service/Folder/edit', {id:this.activeId,title:this.folderName}, res => {	 	
// 			if(res.status == 200){
// 				this.$emit('changeFold');
// 			}
// 			});
// 		},
		addFolder(){
            let list ={
				title:this.folderName,
				parent_id:this.activeId
			}
			$ax.getAjaxData('service/Folder/add', list, res => {	 	
				if(res.status == 200){					   								
						this.addModel = false;
						// this.$emit('changeFold');
						 this.getFolderList()
						
				}
			});
			
		},
		selectChild(fold){		
			this.activeId = fold.id;
		},
		choiceFile(file,event){
			this.activeFile = file.id;
			this.activeCloudF = '';
			this.currentCloudFile = [];
			this.active
			let obj = {
				user_id:file.user_id,
				dir_id:file.id
			}
			$ax.getAjaxData('service/Oauth/get_user_attch', obj, res => {	 	
				if(res.status == 200){					   								
                    this.fileCloud = res.data;
				}else{
					this.fileCloud = [];
				}
			});
		},
		choiceCloudFile(cloud,event){
// 			let ob = {
// 				folder_id:cloud.dir_id,
// 				attch_id:[]
// 			}

        this.activeCloudF = cloud.id;
		this.currentCloudFile = cloud;
		}

    },
    computed: {//计算属性
		iconType(){//显示图标类型
           return function(type){
			  let obj ='';
			  if(type === 'folder'){
			  	obj = 'md-folder';
			  }else if(type === 'txt'){
			  	obj ='md-document';
			  }else if(type === 'jpg' || type === 'png'){
			  	obj = 'md-image'
			  }else if(type ==='doc' || type === 'xls' ||type === 'pdf'){
				 obj = 'ios-paper'
			  }
			  return obj;
		   }
		},
    },
    watch: {//监测数据变化

	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行

	},
    mounted () {//模板被渲染完毕之后执行
           this.getFolderList();
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			//async、await错误处理
			try {
				
				/*
				 * 
				 * ------串行执行---------
				 * console.log(await getAjaxData());
				 * ...
				 * 
				 * ---------并行：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。（执行效率高、快）----------
				 * let abc = getAjaxData();//先执行promise函数
				 * ...
				 * console.log(await abc);
				 * ...
				*/
				next(vm => {
					
				});
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">
.fileRow:hover{
	background-color: #ebf7ff;
	border-bottom: 1px solid #cfecff;
}
.active{
	background-color: #ebf7ff;
	border-bottom: 1px solid #cfecff;
}
.fileRow{
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: nowrap;
	height: 50px;
	padding: 0 10px;
	cursor: pointer;
}
.children{
	margin-left: 50px;
}
.fileLeft{

}
.fileMain{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.active{
	background-color: rgba(102,175,233,0.3);
}
</style>
