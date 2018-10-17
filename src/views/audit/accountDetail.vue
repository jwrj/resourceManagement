<template>
	
	<div>
		<Card>
			<h1 slot="title">政府账户审核</h1>
			<div  style="margin: 15px;">
					<div class="centent">
						<Icon type="md-image" size="180" />
						
						<div class="middle">
							<h1>{{datalist.name}}</h1>
													
							<Row type="flex" justify="start" align="top" >
								<Col span="8">
									<div style="display: flex;">
										<div>			
											<p>注册时间</p>
											<p>身份证号</p>
										</div>
										<div>
											<p>：2017-10-18</p>
											<p>：{{datalist.card ? datalist.card :'--'}}</p>
										</div>
									</div>
								</Col>
								
								<Col span="8">				
								<div style="display: flex;">
									<div>
										<p>联系电话</p>
										<p>手机号码</p>
									</div>
									<div>
										<p>：110110</p>
										<p>：18877798898</p>
									</div>
								</div>
								</Col>
								
							</Row>
							
						</div><hr>
					</div>
			</div>
			
			<div class="content">
				<h1 style="border-bottom: 1px solid brown; padding-bottom: 10px;">单位信息</h1>
					<div class="content-body">
						<Row type="flex" justify="start">
							<Col span="4">职务：</Col>
							<Col span="6">{{datalist.job}}</Col>
						</Row>
						<Row type="flex" justify="start">
							<Col span="4">单位名称：</Col>
							<Col span="6">{{datalist.unit}}</Col>
						</Row>
						<Row type="flex" justify="start">	
							<Col span="4">单位地区：</Col>
							<Col span="6">{{datalist.addr}}</Col>
						</Row>
						<Row type="flex" justify="start">	
							<Col span="4">单位执照：</Col>
							<Col span="18">
								<img :src="imgUrl" style="width: 100px;">
								<img :src="imgUrl" style="width: 100px;">
								<img :src="imgUrl" style="width: 100px;">
							</Col>
						</Row>
					</div>
	
			</div>
			
			
			
			
		</Card>
		
		
	</div>
	
</template>

<script>

export default {
	name: 'accountDetail',
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
        	datalist:[],
			imgUrl:'http://yuanxing.bzttech.com/cocsys/coc_resourceSystem/images/%E5%8F%91%E5%B8%83%E8%B5%84%E6%BA%90-%E4%BC%9A%E5%86%85%E4%BC%9A%E9%97%B4/u708.png'
        }
    },
    methods: {//方法
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.datalist=this.$route.params.datalist;
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
	.centent {
		display: flex;
		align-items: center;
	}
	.middle{
		flex: 3;
	}
	.content-body{
		padding: 15px 30px;
		width: 800px;
	}

</style>
