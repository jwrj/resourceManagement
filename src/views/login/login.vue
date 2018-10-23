<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
		
		<Card style="width: 400px;margin: auto;">
			<Button @click="login">登陆</Button>
		</Card>
			
			
			
			
		
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
         datalist:[]
        	       	
        }
    },
    methods: {//方法
    	
    	login(){
			let u={
				username:'13544552432',
				password:'123456'
			}
    		$ax.getAjaxData('service/User/login',Object.assign({}, u), (res) =>{
    			if(res.status == 200){
    			this.$Message.success('登陆成功!');
				var user={
					username:res.data.username,
					unit:res.data.unit,
					department:res.data.department,
					office:res.data.office
				}
				sessionStorage.setItem('user', JSON.stringify(user));

				this.$router.push({name:'home'});
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