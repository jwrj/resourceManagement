<template>
	

	<div style="height: 100%;background: #001529;display: flex;">
			 <Card style="width: 400px;margin: auto;">
				 <h1 slot="title">超级管理员登陆</h1>
					<Form :model="adminlist">
			 				<FormItem label="用户名:" >
				 						<Input type="text" v-model="adminlist.title"> </Input>
				 				</FormItem>
								<FormItem label="密码:" >
										<Input type="password" v-model="adminlist.password"> </Input>
								</FormItem>
								<FormItem>
									<Button type="primary" @click="adminlogin">登陆</Button>
								</FormItem>
					</Form>
				</Card>
		</div>
	
</template>

<script>

export default {
	name: '',
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
        	adminlist:{
				title:'admin',
				password:'admin888'
			}
        }
    },
    methods: {//方法
    	adminlogin(){
			$ax.getAjaxData('service/Role/login_admin',this.adminlist, res => {
				
				if(res.status == 200){
					sessionStorage.user_type=3;
					this.$router.push('/home');
				}else{
					 this.$Message.error('用户名或密码错误');
				}
			});
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
