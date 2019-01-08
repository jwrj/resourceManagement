<template>
	
	<div style="display: flex;">
	<Spin size="large" fix v-if="spinShow"></Spin>
	<div style="flex: 3;margin-right: 5px;">
		<Card style="padding: 15px;">
			<p style="font-size: 26px;margin-bottom: 20px;color:#333333;" class="bold">
			 {{datalist.title}}
				<p style="color:#ccc;">
					<span style="margin-right:5px;" v-if="!datalist.release_time ==0">发布时间：{{datalist.release_time | formatDate}}</span>
					<span v-else="datalist.release_time ==0" style="margin-right:15px;" >等待审核，未发布</span>
					<span>点击量：{{datalist.hits}}</span>
				</p>
			</p>
  <div style="padding: 15px 0; border-bottom: 1px solid #C2CCD1;">
	  <Row style="width: 70%;">
	  	<Col span="12" style="text-align: left;">
	  		<p>开始时间：{{datalist.start_time}}</p>
	  		<p>发布范围：{{datalist.scope_release==1?'会内':'会外'}}</p>
	  		<p>协助程度：{{datalist.provide}}</p>
	  		<p>介绍费用：{{datalist.introduce_money |Trans}}</p>
	  		<p>项目周期：{{datalist.period}}</p>
	  	</Col>

	  	<Col span="12" style="text-align: left;">
	  		<p>结束时间：{{datalist.end_time}}</p>
	  		<p>项目总额：{{datalist.total_money |Trans}}</p>
	  		<p>担保金额：{{datalist.guaranty_money |Trans}}</p>
	  		<p>需求资质：{{datalist.qualification}}</p>
	  		<p>交付地点：{{datalist.delivery_point}}</p>
	  	</Col>
	  </Row>
  </div>
   <div>
	<p class="title">项目介绍</p> 
	<Img :src="img" width="60%" style="margin-right: auto;"/>
	 <p v-html="datalist.remark"></p>
   </div>
		</Card>
		
	 <!-- <Card style="margin-top: 5px;padding-left: 15px;">
		<h1 slot="title">审核单位信息</h1>
     <div class="cham">
		 <p>审核单位：<span style="margin-right: 3px;" v-for="(ch,index) of datalist.cham">{{ch.name}}</span></p>
		 <p>审核日期：2018-01-14</p>
		 <p>审核人员：张三</p>
		 <p>所属职务：秘书长</p>
		 <p>项目评估：中投顾问项目组通过对深圳市的传统优势主导产业、现有的产业布局以及新兴产业聚集的调研分析，基于项目具备的区位、产业基础、开发商的资源等，设计了产业发展及产业资源导入方案。</p>
		 <p>审核文件：
		 <Icon type="md-image" size="70"/>
		 </p>
		 <p>附件下载：项目审核所需要的word文档</p>
	 </div>
	 </Card> -->

	</div>
   <right-card  :list="datalist" :person="person"  :showResource="true"  @adminAudit="audit">
	 </right-card>
	</div>
  
</template>

<script>
import defaultImg from '@/assets/img/default-img/u969.jpg'
import rightCard from '@/views/audit/component/rightCard.vue'
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
			spinShow:false,
			title:'',
			datalist:[],
			img:defaultImg,
			person:[]
			
        }
    },
    methods: {//方法
		audit(auditFlag){
			let adt ={
				id:this.datalist.id,
				status:auditFlag
			}
			$ax.getAjaxData('service/Resource/preview',Object.assign({}, adt), res => {
				
				if(res.status == 200){
					this.$Message.success('审核成功');
					this.datalist.status =1;
				}
			});
		}
    },
    computed: {//计算属性

    },
    watch: {//监测数据变化
      datalist(){
				this.$set(this.person,'center_name',this.datalist.release_people.center_name);
				this.$set(this.person,'work_phone',this.datalist.release_people.work_phone);
				this.$set(this.person,'unit',this.datalist.release_people.unit);
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
				 * 						
				*/
				next(vm => {

					let id =''; //有id就请求  没id就读取session
         if(to.query.id || to.query.source_id){
			 vm.spinShow = true;
					 if(to.query.source_id){
					 	id = to.query.source_id;
					 }else if(to.query.id){
					 	id = to.query.id;						
					 }
					 
					 $ax.getAjaxData('service/Resource/detail',{id:id}, (res) =>{
					 	if(res.status == 200){
					 		vm.datalist = res.data;
					 		sessionStorage.setItem('current', JSON.stringify(res.data));
					 	}else if(res.status==300){
					 		vm.datalist = []
					 	}
						vm.spinShow = false;
					 });
					 
				 }else{
					 const userJsonStr = sessionStorage.getItem('current');
					 	vm.datalist = JSON.parse(userJsonStr);
						vm.spinShow = false;
				 }
				});
				
			} catch(err) {
				console.log(err);
			}
			
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
</style>