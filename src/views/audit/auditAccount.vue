<template>
	
	<div>
		<Card>
			<h1 slot="title">政府账户审核</h1>
				<div>
						<slot name="header"></slot>
						<Input v-model="word" style="width: 200px;margin:0 5px;" />
						<Button type="primary" @click.native="search">搜索</Button>
					<div class="imgtext" style="margin: 15px;">
						<div class="centent" v-for="(data,index) in datalist" :key="index" @click="rowclick(data)">
							<Icon type="md-contact" size="160" />
							<div class="middle">
						<p>
							<div class="user">{{list(data.person,'truest_name')}}</div>
						<span style="color: #AAAAAA;">注册时间：{{list(data.person,'addtime') |formatDate}}</span>
						</p>
				
				<Row type="flex" justify="start" align="top" >
					<Col span="8">
						<div style="display: flex;">
							<div>

								<p>单位</p>
								<p>职务</p>
								<p>地区</p>
							</div>
							<div>
								<p>：{{data.unit}}</p>
								<p>：{{data.office}}</p>
								<p>：{{list(data.person,'hometown')}}</p>
							</div>
						</div>
					</Col>
					
					<Col span="8">				
					<div style="display: flex;">
						<div>
							<p>单位执照</p>
							<p>身份证</p>
							<p>单位证明</p>
						</div>
						<div>
							<p >：{{data.unit_license | flag}}</p>
							<p>：{{list(data.person,'card_img')}}</p>
							<p>：{{data.unit_prove | flag}}</p>
						</div>
					</div>
					</Col>
					<Col span="8">

						<div style="display: flex;">
							<div>
								<p>审核状态：</p>
							</div>
							<div>
								<p v-if="data.status == 0" style="color: red;">审核未通过</p>
								<p v-if="data.status ==1" style="color: green;">审核已通过</p>
							</div>
						</div>
					</Col>
				</Row>
							</div>
							<hr>

						</div>
						 <Page :total="total" show-total @on-change="changePage" style="margin-top: 10px;margin-left: 30px;"/>
					</div>
					
				</div>
		</Card>

	</div>
	
</template>

<script>
import {formatDate} from '../../../public/js/date.js'
import defaultHead from '../../../public/head.jpg'
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
			defaultHead:defaultHead,
        	word: '',
			total:0,
			current:1,
			pageShow:true,
			datalist:[]

        }
    },
    methods: {//方法
    	search() {
    		let searchList = {
				page:this.current,
				name:this.word
			}
    		$ax.getAjaxData('service/User/gov_user',searchList, (res) =>{
    			if(res.status == 200){
    				this.datalist=res.data;
    			}else if(res.status==300){
    				this.datalist=[];
    			}
    		});
    	},
    	rowclick(data){
    		this.$router.push({ path: '/audit/accountDetail', query: { id:data.id}});
    	},
    	formatTime(date){
    		this.formInline.time = date;
    	},
		changePage(page){
			this.current = page;
		}
    },
    computed: {//计算属性
			list(){
				  
				    return function(tome,type) {
                if(tome === null){
									return '未填写'
								}else {
												return tome[type];
									}
									
           }
			}
    },

    watch: {//监测数据变化
//        formInline:{
//            handler(curVal,oldVal){
//                 console.log(curVal);
//             },
//             deep: true,
// 	   }
	   
	},
    filters:{
		
		flag:function(value){
			
			if(JSON.stringify(value) !== '[]'&& value.length!==0){
				return '已上传'
			}else{
				return '未上传'
			}
		},
				formatDate(time) {
						 var date = new Date(time*1000);
							 return formatDate(date, 'yyyy-MM-dd');
						 
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
					   let resourceData = await $ax.getAsyncAjaxData('service/User/gov_user',{page:1});
						   
							next(vm => {
									if(resourceData.status == 200){
										vm.datalist=resourceData.data;
										vm.total = resourceData.data.length;
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
	.centent {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #BBBBBB;
	}
	.middle{
		flex: 3;
	}
     .user{
		 font-size: 18px;
		 font-weight: 700;
		 margin-right: 5px;
	 }
</style>
