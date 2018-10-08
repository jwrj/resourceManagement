<template>
	
	<div>
		
		<Card>
			
			<h1 slot="title">申请加入商会</h1>
			
			<Alert show-icon>
		    	温馨提示：如果您选择了公司将会以公司的名义加入商会，反之就以个人的名义加入商会。
		    </Alert>
		    
			<Select filterable clearable placeholder="选择公司" style="width:300px;margin-bottom: 16px;display: block;">
		        <Option :value="0">公司1</Option>
		    </Select>
		    
			<div style="padding-bottom: 16px;">
				<Button>查看个人资料</Button>
			</div>
			
			<Divider orientation="left"><span style="font-size: 16px;">商会列表</span></Divider>
			
			<table-list :tableColumns="tableColumns" @on-btn-click="tabBtnClick">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
			
				    <industry-casc style="margin-right: 10px;"></industry-casc>
				    
				    <post-casc style="margin-right: 10px;"></post-casc>
				    
				    <al-cascader v-model="res_c"/>
		    
				</div>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import postCasc from '@/components/post/post-casc.vue';//岗位级联

export default {
	name: '',
	components:{//组件模板
		tableList,
		industryCasc,
		postCasc,
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
        	
        }
    },
    methods: {//方法
    	tabBtnClick(params){
    		params.loading = true;
    		this.tableColumns.forEach(item => {
    			
    			if(item.handle){
    				item.handle.forEach(item2 => {
    					if(item2.key === 0){
    						item2.props.loading = true;
    						setTimeout(() => {
    							item2.props.loading = false;
    						},2000);
    					}
    				})
    			}
    			
    		});
    		console.log(params);
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