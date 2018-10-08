<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
		
		<Card style="width: 400px;margin: auto;">
			
			<h1 slot="title">选择商会进入系统</h1>
			
			<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">
				
				<FormItem prop="chamberId" label="选择商会">
					
					<Select v-model="formInline.chamberId" filterable clearable placeholder="选择您已加入的商会">
				        <Option :value="1">商会1</Option>
				        <Option :value="2">商会2</Option>
				        <Option :value="3">商会3</Option>
				    </Select>
					
				</FormItem>
				
			</Form>
			
			<div style="text-align: center;">
				<Button type="primary" long @click="login('formInline')">确定</Button>
			</div>
			
			<div style="margin-top: 16px;text-align: center;">没有商会<a @click="openChamberList = true">立即申请加入</a></div>
			
		</Card>
		
		<Modal
	        v-model="openChamberList"
	        title="商会列表"
	        width="60%"
	        :footer-hide="true"
	       	>
	       	<Button slot="close">关闭</Button>
	        <table-list :tableColumns="tableColumns">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
			
				    <industry-casc style="margin-right: 10px;"></industry-casc>
				    
				    <post-casc style="margin-right: 10px;"></post-casc>
				    
				    <al-cascader v-model="res_c"/>
		    
				</div>
			</table-list>
	    </Modal>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import postCasc from '@/components/post/post-casc.vue';//岗位级联

export default {
	name: 'login',
	components:{//组件模板
		tableList,
		industryCasc,
		postCasc
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
        	
        	openChamberList: false,
        	
        	formInline: {
                chamberId: '',
            },
            
            ruleInline: {
                chamberId: [
                    { type: 'number', required: true, message: '请选择商会', trigger: 'change' }
                ],
            },
        	
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
    	
    	login(name){
    		
    		this.$refs[name].validate((valid) => {
    			
                if (valid) {
                    
                    sessionStorage.chamberId = this.formInline.chamberId;
                    
		    		this.$router.replace({
						name: 'home'
					});
					
					this.$Message.success('选择成功!');
					
                }
                
            });
    		
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