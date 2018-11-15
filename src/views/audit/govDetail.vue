<template>
	
	<div style="display: flex;">
	<div style="flex: 3;margin-right: 5px;">
		<Card style="padding: 15px;">
			<p  class="bold top">
				{{datalist.title}}
				<p style="color:#ccc;">
					<span style="margin-right:5px;">发布时间：{{datalist.release_time | formatDate}}</span>
					<span>点击量：{{datalist.hits}}</span>
				</p>
			</p>
  <div style="padding: 15px 0; border-bottom: 1px solid #C2CCD1;">
	  <Row style="width: 75%;">
	  	<Col span="12" style="text-align: left;">
	  		<p>开始时间：{{datalist.start_time}}</p>
	  		<p>发布范围：<span v-for="(data,index) of datalist.scope_select">{{data}}</span></p>
	  		<p>投资金额：{{datalist.invest_money |Trans}}</p>
	  		<p>收益年限：{{datalist.profit_limit}}年</p>
	  	</Col>
	  	<Col span="12" style="text-align: left;">
	  		<p>结束时间：{{datalist.end_time}}</p>
	  		<p>合作方式：政企合作</p>
	  		<p>预计收益：{{datalist.profit |Trans}}</p>
	  		<p>联系人员：<p v-for="(u,index) of datalist.contacts">{{u.name}}-{{u.phone}}</p></p>
	  	</Col>
	  </Row>
  </div>
  
   <div>
	<p class="title">项目介绍</p> 
	<Img :src="img" width="60%" style="margin-right: auto;"/>
   <p style="margin: 10px 5px;" v-html="datalist.remark"></p>
   </div>
   

   
		</Card>
		
	 <Card style="margin-top: 5px;padding-left: 15px;">
		<h1 slot="title">投资环境介绍</h1>
     <div class="cham">
		 <p>
			 项目简介：项目定位为国际时尚创意云谷，希望打造成为时尚人才聚集地、时尚文化体验区、时尚产业风向标，产业重点聚焦在时尚设计、时尚体验、时尚消费、时尚展示四大板块。
		 </p>
		 <p>
			 项目方案：中投顾问项目组通过对深圳市的传统优势主导产业、现有的产业布局以及新兴产业聚集的调研分析，基于项目具备的区位、产业基础、开发商的资源等，设计了产业发展及产业资源导入方案。
		 </p>
		 <p>
			 说明：中投顾问展示本文案例仅供您参考，关于您的区域产业规划问题，更多个性化的解决方案，请与我们的咨询顾问联络，我们的园区产业规划咨询顾问将与您一起来深入分析项目，并为您制定针对性的项目解决方案。
		 </p>
	 </div>
	 </Card>
		
	</div>
    <right-card :list="datalist" :showResource="true"></right-card>
		
	</div>
	
</template>

<script>
import rightCard from '@/views/audit/component/rightCard.vue'
import defaultImg from '@/assets/img/default-img/u2454.jpg'
import {formatDate} from '../../../public/js/date.js'
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
			title:'',
			img:defaultImg,
			datalist:[]
			
        }
    },
    methods: {//方法
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
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
				//有id就请求  没id就读取session
					if(to.query.id){
						$ax.getAjaxData('service/Resource/detail',{id:to.query.id}, (res) =>{
							if(res.status == 200){
								vm.datalist = res.data;
								sessionStorage.setItem('govRes', JSON.stringify(res.data));
							}else if(res.status==300){
								vm.datalist = []
							}
						});
					}else{
						const userJsonStr = sessionStorage.getItem('govRes');
							vm.datalist = JSON.parse(userJsonStr);
					}
					});
				
			} catch(err) {
				console.log(err);
			}
			
			next();
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">
	.gray{
		font-size: 12px;
	}
	.title{
		background:#dcdee2;
		width: 100px;
		height:30px;
		text-align: center;
		padding: 5px 0;
		margin: 15px 0;
	}
	.text{
		width: 70%;
		margin-top: 15px;
	}
	.cham{
		p{
			margin-top: 17px;
		}
	}
	.top{
		font-size: 26px;
		margin-bottom: 20px;
		padding-bottom:20px;
		color:#333333;
		border-bottom: 1px solid brown;
	}
</style>