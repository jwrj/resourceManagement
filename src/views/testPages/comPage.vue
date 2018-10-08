<template>
	
	<div>
		
		<!--表格列表-->
		<Card style="position: initial;">
			
			<h1 slot="title">表格列表</h1>
			
			<table-list :tableColumns="tableColumns">
		
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
			
				    <industry-casc style="margin-right: 10px;"></industry-casc>
				    
				    <post-casc style="margin-right: 10px;"></post-casc>
				    
				    <al-cascader v-model="res_c"/>
		    
				</div>
				
				<div slot="modalContent">
					弹窗内容
				</div>
		
			</table-list>
			
		</Card>
		
		<!--岗位配置-->
		<Card style="margin-top: 16px;">
			
			<h1 slot="title">岗位配置</h1>
			
			<post-config></post-config>
			
		</Card>
		
		<!--文件管理-->
		<Card style="margin-top: 16px;height: 600px;">
			
			<h1 slot="title">文件管理</h1>
			
			<file-manage currentRouteName="comPage"></file-manage>
			
		</Card>
		
	    <Card style="margin-top: 16px;">
	    	
	    	<h1 slot="title">富文本编辑器</h1>
	    	
	    	{{editor_content}}
	    	
	    	<UEditor :configs='editor_config' @up_editor_content="upEditorContent"></UEditor>
	    	
	    </Card>
	    
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue';//表格列表组件

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import postCasc from '@/components/post/post-casc.vue';//岗位级联

import postConfig from '@/components/postConfig/post-config.vue';//岗位配置

import fileManage from '@/components/fileManage/file-manage.vue';//文件管理

import UEditor from '@/components/richTextEditor/UEditor.vue';//富文本编辑器

export default {
	name: 'comPage',
	components:{//组件模板
		tableList,
		industryCasc,
		postCasc,
		postConfig,
		fileManage,
		UEditor,
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
        	
        	res_c: [],
        	
        	tableColumns: [
				{
			        title: 'ID',
			        key: 'id'
			    },
			    {
			        title: '名称',
			        key: 'name'
			    },
			    {
			        title: '日期',
			        key: 'date'
			    },
			    {
			    	align: 'center',
			    	width: 130,
			        title: '操作',
			        handle: [
			        	{
			        		name: '申请加入',
			        		key: 0,
			        		props: {
			        			loading: false
			        		}
			        	}
			        ],
			    }
			],
			
			editor_config:{
		    	width:'100%',
		    	height:'500px'
		   },
		   
		   editor_content: '',
        	
        }
    },
    methods: {//方法
    	
    	upEditorContent(value){
    		this.editor_content = value;
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
	
</style>