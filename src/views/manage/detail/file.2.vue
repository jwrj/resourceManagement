<template>
	
	<div>
	  <div >
	  	<div v-for="item in folderGroup"
		:key="item.title" >
			<div class="fileRow" @click="selectChild(item,$event)">
				<span><Icon type="md-folder" />{{item.title}}</span>
				<div>
					<Tag color="blue" @click.native.stop="add(item)">添加子文件夹</Tag>
					<Tag color="blue" @click.native.stop="del(item)">删除</Tag>
					<Tag color="blue"  @click.native.stop="edit(item)">编辑</Tag>
					<Tag color="blue"   @click.native.stop="af(item)">添加附件</Tag>
				</div>
				</div>

				<div v-if="item.children" class="children">
					<file :folderGroup="item.children" v-on="$listeners"></file>
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
		<Modal v-model="editModel" @on-ok="editFolder">
			<p slot="header">编辑文件名</p>
				<Form  :label-width="90">
					<FormItem label="文件夹名称">
								<Input v-model="folderName" clearable placeholder="输入名称" />
					</FormItem>
				</Form>
		</Modal>
		<Modal v-model="fileModel" @on-ok="addFile">
			<p slot="header">我的文件云目录</p>
			<span v-for="file of fileList">
			{{file.title}}
			</span>
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
		folderGroup:{
			type:Array,
			default: () => []
		}
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
			this.activeId = current.id;
		},
		edit(current){
			this.editModel = true;
			this.activeId = current.id;		
		},
		del(current){		
			$ax.getAjaxData('service/Folder/del', {id:current.id}, res => {	 	
			if(res.status == 200){	
			   this.$emit('changeFold');
			   this.selectChild(current)
			  }
			});
			
		},
		af(current){
			this.fileModel = true;
			this.activeId = current.id;		
			$ax.getAjaxData('service/Oauth/get_user_dir', {}, res => {	 	
			if(res.status == 200){	
				this.fileList = res.data;
			}
			});
		},
		addFile(){
			
		},
		editFolder(id){
			$ax.getAjaxData('service/Folder/edit', {id:this.activeId,title:this.folderName}, res => {	 	
			if(res.status == 200){
				this.$emit('changeFold');
			}
			});
		},
		addFolder(){
            let list ={
				title:this.folderName,
				parent_id:this.activeId
			}
			$ax.getAjaxData('service/Folder/add', list, res => {	 	
				if(res.status == 200){					   								
						this.addModel = false;
						this.$emit('changeFold');
						this.getFolderList()
						
				}
			});
			
		},
		selectChild(fold){		
			this.activeId = fold.id;
			let arr =[];
			this.folderList.forEach(item=>{
				if(this.activeId ==item.parent_id){
					arr.push(item)
				}
			})
			let i = this.folderList.indexOf(fold);
			this.$set(fold,'children',arr);
			this.activeId = '';

		},
    },
    computed: {//计算属性
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
</style>
