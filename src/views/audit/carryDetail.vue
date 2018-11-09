<template>
	
	<div style="display: flex;">
	<div style="flex: 3;margin-right: 5px;">
		<Card style="padding: 15px;">
			<p style="font-size: 26px;margin-bottom: 20px;color:#333333;" class="bold">
				{{list.title}}
			</p>
			
			<p style="padding: 15px 0;">
				<h1>承接单位信息</h1>
				<br>
				<p>承接单位：{{list.name}}</p>
				<p>联系人：{{list.person}}</p>
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
		 <right-card :list="list" :showAudit="true" :showResource="true" ></right-card>
	 </div>
		
	</div>
	
</template>

<script>
import {bus} from '@/components/bus/event-bus.js'
import rightCard from '@/views/audit/component/rightCard.vue'
export default {
	name: '',
	components:{//组件模板
	rightCard
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
        	list:{
				unit:'发布人单位',
				work:'职务',
				person:'user'
			},
			title:'标题',
        }
    },
    methods: {//方法
    	openDetail(detailData){
    	this.list=detailData.unit;
    	}
    },
    computed: {//计算属性
  	currentResource() {
		return bus.currentResource
	}
    },
    watch: {//监测数据变化
       currentResource(newValue,oldValue) {
		   this.list=newValue;
	   }
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
		if(this.$route.params.list){
// 			this.list.unit=this.$route.params.list.name;
// 			this.title=this.$route.params.title;
			this.list=bus.currentResource;
			console.log(this.list)
		}
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
				 * ...beforeRouteUpdate：在当前路由改变，但是该组件被复用时调用
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
