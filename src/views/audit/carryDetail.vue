<template>
	
	<div style="display: flex;">
	<div style="flex: 3;margin-right: 5px;">
		<Card style="padding: 15px;">
			<p style="font-size: 26px;margin-bottom: 20px;color:#333333;" class="bold">
				{{resource.title}}
			</p>
			<p style="color:#ccc;">
				<span style="margin-right:5px;" v-if="!resource.release_time ==0">发布时间：{{resource.release_time | formatDate}}</span>
				<span>点击量：{{resource.hits}}</span>
			</p>
			<!-- <p style="padding: 15px 0;">
				<h1>承接单位信息</h1>
				<br>
				<p>承接单位：{{datalist.company_name==''?'个人承接':datalist.company_name}}</p>
				<p>联系人&nbsp;&nbsp;&nbsp;&nbsp;：{{people.center_name}}</p>
				<p>联系电话：{{people.work_phone}}</p>
				<p>承接时间：{{datalist.create_time}}</p>
				<p>进度状况：已承接</p>
				<p>交付时间：2019-02-01</p>
				<p>担保金额：50万</p>
				<p>介绍费用：10万</p>
			</p> -->
			<div style="width: 400px;margin: 10px 0;">
				<div style="display: flex;justify-content: center;align-items: center;">
					<div class="left" style="flex: 3;">
						<h1>承接单位信息</h1>
						<br>
						<p>承接单位：{{datalist.company_name==''?'个人承接':datalist.company_name}}</p>
						<p>联系人&nbsp;&nbsp;&nbsp;&nbsp;：{{people.center_name}}</p>
						<p>联系电话：{{people.work_phone}}</p>
						<p>承接时间：{{datalist.create_time}}</p>
						<p>进度状况：已承接</p>
						<p>交付时间：2019-02-01</p>
						<p>担保金额：50万</p>
						<p>介绍费用：10万</p>
					</div>
					<div class="right" style="flex: 1;">
						    <i-circle :percent="100">
        <span class="demo-Circle-inner" style="font-size:24px">已承接</span>
    </i-circle>
					</div>

				</div>
			</div>

		</Card>
	</div>
	 <div style="flex: 1;">
<!-- 		 <Card>
		 	<div slot="title">
		 		<h1>发布人信息</h1>
		 	</div>
		 	<div class="centent">
		 					<Icon type="md-image" size="120" />
		 					<div class="middle">
		 					<h1>{{poster.center_name}}</h1>
		 					<p>所属单位：{{poster.unit?poster.unit:''}}</p>
		 					<p>手机号码：{{poster.work_phone}}</p>
		 					</div>
		 	</div>
		 </Card> -->
		 <Card style="margin-top: 5px;">
		 	<div slot="title">
		 		<h1>其他承接单位</h1>
		 	</div>
		 	
		 	<div class="unit" v-for="(unit,index) of datalist.relation" :key="index" @click="rowclick(unit)" ><!--v-if="unit.company_id"-->
		 		<p style="font-size: 16px;color: black;" >{{unit.company_name?unit.company_name:'个人承接'}}</p>
		 		<p class="gray">创建时间：{{unit.create_time | formatDate}}</p>
		 	</div>
		 </Card>
	 </div>
		
	</div>
	
</template>

<script>
	import {formatDate} from '../../../public/js/date.js'
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
        	list:{
				unit:'发布人单位',
				work:'职务',
				person:'user'
			},
			datalist:[],
			people:[],//承接者相关
			poster:[],//发布者县官
			resource:[],//资源相关
			title:'标题',
        }
    },
    methods: {//方法
    	openDetail(detailData){
    	this.list=detailData.unit;
    	},
			rowclick(unitData){ 
         this.ajaxResUser(unitData.id);
			},
			ajaxResUser(id){
				$ax.getAjaxData('service/ResourceUser/detail',{id:id}, res => {				
					if(res.status == 200){
							this.datalist = res.data;
							this.people = res.data.contract_people;
							this.poster = res.data.release_people;
							this.resource = res.data.resource;
					}else if(res.status == 300){
						this.$Message.error({
								content: res.message,
								duration: 7
						});
					}
				});
			}
    },
    computed: {//计算属性
    },
    watch: {//监测数据变化
       currentResource(newValue,oldValue) {
		   this.list=newValue;
	   },
		 datalist(){
			 sessionStorage.setItem('currentCarry', JSON.stringify(this.datalist));
		 }
	},
	filters: {
			formatDate(time) {
					var date = new Date(time*1000);
					return formatDate(date, 'yyyy-MM-dd hh:mm');
			},
			Trans(num){
				return `${num/100}元`;
			}
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
		if(this.$route.query.id){
			this.ajaxResUser(this.$route.query.id);
		}else{
			const userJsonStr = sessionStorage.getItem('currentCarry');
			this.datalist = JSON.parse(userJsonStr);
			this.person = this.datalist.contract_people;	
			this.poster = this.datalist.release_people;
			this.resource = this.datalist.resource;
			
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
				// let resourceData = await $ax.getAsyncAjaxData('service/ResourceUser/detail',{id:to.query.id});
				next(vm => {
// 					if(resourceData.status == 200){
// 								vm.datalist=resourceData.data;
// 								vm.people = resourceData.data.contract_people;
// 								vm.resource = resourceData.data.resource;
// 								sessionStorage.setItem('currentCarry', JSON.stringify(resourceData.data));
// 								
// 					}
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
	.audit{
		// border-top: 1px solid #C2CCD1;
		margin: 10px 0;
		padding-top: 10px;
	}
</style>
