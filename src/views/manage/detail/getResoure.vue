<template>
	
	<div style="display: flex;">
	<div style="flex: 3;margin-right: 5px;">
		<Card style="padding: 15px;">
			<p style="font-size: 28px;margin-bottom: 20px;color: black;">
				中国（武汉·新洲）厨卫基地发展战略规划与招商策划案例
			</p>
			
			<p style="padding: 15px 0;">
				<h1>承接单位信息</h1>
				<br>
				<p>承接单位：广西建工集团</p>
				<p>联系人：张三</p>
				<p>联系电话：0771-1234567</p>
				<p>承接时间：2017-01-16</p>
				<p>进度状况：已承接</p>
				<p>交付时间：2019-02-01</p>
				<div>
					<p>资质:</p>
					<Icon type="md-image"  size="100"/>
					<Icon type="md-image"  size="100"/>
					<Icon type="md-image"  size="100"/>
				</div>
				
				<div>
					<p>担保金额:50万</p>
					<Icon type="md-image"  size="100"/>
				</div>
				
				<div>
					<p>介绍费用:10万</p>
					<Icon type="md-image"  size="100"/>
				</div>
			</p>
		</Card>
	</div>
		<div style="flex: 1;">
			<Card>
				<div slot="title">
					<h1>发布人信息</h1>
				</div>
				<div class="centent">
								<Icon type="md-image" size="120" />
								<div class="middle">
				                <h1>张三丰</h1>
								<p>所属单位：广西南宁政府</p>
								<p>所属职务：联系专员</p>
								<p>商会实名认证</p>
								</div>
								<hr>
				</div>
			</Card>
			
			<Card style="margin-top: 5px;">
				<div slot="title">
					<h1>其他承接单位</h1>
				</div>
				
				<div class="unit" v-for="(unit,index) of units" :key="index">
					<p style="font-size: 16px;color: black;" >{{unit.name}}</p>
					<p class="gray">商会：{{unit.cham}}</p>
					<p class="gray">时间：{{unit.date}}</p>
				</div>
			</Card>
		</div>
		
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
        	units:[
				{
					name:'深圳市中投顾问股份有限公司',
					cham:'广西湖北商会',
					date:'2017-01-01'
				},
				{
					name:'南宁市高新顾问股份有限公司',
					cham:'广西湖北商会',
					date:'2017-08-01'
				},
				{
					name:'中山市石头信息科技有限公司',
					cham:'广西湖北商会',
					date:'2017-07-21'
				},
				{
					name:'桂林市大富翁股份有限公司',
					cham:'广西湖北商会',
					date:'2017-11-09'
				},
				{
					name:'北京市豆浆油条有限公司',
					cham:'广西湖北商会',
					date:'2017-12-13'
				}
			]
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
	.gray{
		font-size: 12px;
	}
	.unit{
		border-bottom: 1px solid #C2CCD1;
		padding: 8px 2px;
	}
</style>
