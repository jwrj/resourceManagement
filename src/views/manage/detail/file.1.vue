<template>
	
	<div>
	 <p v-if="currentFold.id"><Button>添加附件</Button></p>
	  <div class="container">
		  <div v-for="(item,index) of folderGroup" 
		  class="eachFolder" @click="clickFolder(item)"
		  >
					<Icon type="ios-albums" size="58" />
					<p style="text-align: center;overflow: hidden;width: 50px;">{{item.title}}</p>
			
		  </div>

		<div class="foldBtn"
		@click.stop="open">
		<Icon type="md-add" size="58" />
			<p style="text-align: center;">点击新建</p>
		</div>
		<div class="foldBtn"
		@click.stop="back" v-if="beforeFold.length>0">
		<Icon type="md-arrow-back" size="58" />
			<p style="text-align: center;">返回上级</p>
		</div>
	  </div>
		<Modal v-model="addFold">
			<p slot="header">新建文件夹</p>
	<Form  :label-width="90">
		<FormItem label="文件夹名称">
					<Input v-model="folderName" clearable placeholder="输入名称" />
		</FormItem>
	</Form>
			</Modal>
			<Modal v-model="openFold">
				<p slot="header">详情</p>
                   <div class="container">
                   	<div v-for="(item,index) of foldDetail" 
                   	class="eachFolder"
                   	>
                   			<Icon type="ios-albums" size="58" />
                   			<p style="text-align: center;overflow: hidden;width: 50px;">{{item.title}}</p>

                   	
                   	</div>
					</div>
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
			folderGroup:[],
			openFold:false,
			addFold:false,
			folderName:'',
			foldDetail:[],
			beforeFold:[],
			currentFold:[]
        }
    },
    methods: {//方法
    	showFoldList(){
			$ax.getAjaxData('service/Folder/index', {}, res => {
				
				if(res.status == 200){
					this.folderList = res.data;
					let folder=[];
					this.folderList.forEach(item=>{
						if(item.level ==0){
							folder.push(item);
						}
					})
					this.folderGroup = folder;
				}
			});
		},
		open(){
			this.addFold = true;
		},
		back(){
			this.folderGroup = this.beforeFold;
			// this.beforeFold = [];
		},
		clickFolder(fold){
			// this.openFold = true;
			this.currentFold = fold;
			this.beforeFold = this.folderGroup;
			let arr=[];
			this.folderList.forEach(it=>{
				if(it.parent_id == fold.id)
				arr.push(it);
			});
			this.folderGroup = arr;
			
		}
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	this.showFoldList();
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
.container{
	  display: flex;
	  flex-direction: row; 
	  margin-top: 10px; 
	  flex-wrap: wrap;
	  justify-content: flex-start;
	  align-items:flex-start;
}
.eachFolder{
	padding: 5px;
	margin: 10px;
}
.foldBtn{
	border: 1px dashed rgba(81,90,110,0.3);
	width: 80px;
	padding: 5px;
	margin: 10px;
}

</style>
