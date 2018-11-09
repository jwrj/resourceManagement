<template>
	<div>
		<Form :model="formInline">
			<slot name="header"></slot>
			<p>
				<RadioGroup 
				v-model="formInline.range" 
				type="button" 
				style="margin-bottom: 5px;"
				@on-change="search"
				v-if="!hideRadio">	
					<Radio label="1" style="margin-right:5px;">会内资源</Radio>
					<Radio label="2">会间资源</Radio>
					</RadioGroup>
			</p>
			<DatePicker 
			:value="formInline.time" 
			type="daterange" 
			split-panels 
			placeholder="选择时间"
			@on-change="formatTime"
			style="width: 200px">
			</DatePicker>
			
			<Input v-model="formInline.word" style="width: 200px;margin:0 5px;" />
			<Button type="primary" @click.native="search">搜索</Button>
			<p style="margin-top: 6px;">
				<CheckboxGroup v-model="formInline.check" v-if="!hidecheck" @on-change="search">
					<Checkbox label="0">审核中</Checkbox>
					<Checkbox label="1">审核通过</Checkbox>
					<Checkbox label="2">审核不通过</Checkbox>
				</CheckboxGroup>
			</p>
		</Form>
		<div class="imgtext" style="margin: 15px;">
			<div class="centent" v-for="(data,index) of datalist" :key="index" @click="rowclick(data)">
				<Icon type="md-image" size="120" />
				<div class="middle" style="flex: 2;">
						<Row :gutter="16">
						<Col span="10">
						<h1 class="title">{{data.title}}</h1>
						</Col>
						<Col span="6" style="color: #F43838;" v-if="data.invest_money">{{data.invest_money |Trans}}</Col>
						<Col span="6" style="color: #F43838;" v-if="data.total_money">{{data.total_money |Trans}}</Col>
					</Row>
					
					<Row :gutter="16">
						<Col span="12"  v-if="data.release_people.center_name || data.center_name">发布者  &nbsp;&nbsp;：{{data.release_people.center_name || data.center_name}}</Col>
						<Col span="12" >发布时间：{{data.release_time |formatDate}}</Col>	
					</Row>
					<Row :gutter="16" v-if="gettime">
						<Col span="12" >{{data.contract_people==''?'承接身份：个人':`承接身份：${data.contract_people}`}}</Col>
						<Col span="12" >承接时间：{{data.create_time |formatDate}}</Col>	
					</Row>							
					<Row :gutter="16" v-if="resIn">
						<Col span="12" >访问次数：{{data.hits?data.hits:0}}</Col>
						<Col span="12" >结束时间：{{data.end_time}}</Col>	
					</Row>	
				</div>
				<hr>

			</div>
		</div>
		
	</div>

</template>

<script>
import {formatDate} from '../../../../public/js/date.js'
	export default {
		name: '',
		components: { //组件模板
		},
		props: { //组件道具（参数）
			/* ****属性用法*****
			 * 
			 * 传递类型 type: Array | Number | String | Object
			 * 为必传 required: true
			 * 默认值 default: ''
			 * 
			 */
			datalist: {
				type: Array,
				default: () => []
			},
			hideRadio:{
				type:Boolean,
				default:false
			},
			hidecheck:{
				type:Boolean,
				default:false
			},
			gettime:{
				type:Boolean,
				default:false
			},
			resIn:{
				type:Boolean,
				default:false
			}
		},
		data() { //数据
			return {
				formInline: {
					check: [],
					word: '',
					time: ["",""],
					range:'1'
				},
				userdata:[]
			}
		},
		methods: { //方法
			search() {
				this.$emit('search',this.formInline);
			},
			rowclick(data){
				this.$emit('openDetail',data);
				
			},
			formatTime(date){
				this.formInline.time = date;
			}
		},
		computed: { //计算属性
		},
		watch: { //监测数据变化,
		},
		filters: {
				formatDate(time) {
					  if(!time==0){
						var date = new Date(time*1000);
						return formatDate(date, 'yyyy-MM-dd');
						}else{
							return '等待审核，未发布'
						}
				},
				Trans(num){
					return `${num/100}元`;
				}

		},
		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行

		},
		mounted() { //模板被渲染完毕之后执行	
		},

		//=================组件路由勾子==============================

		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

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
					   let resourceData = await $ax.getAsyncAjaxData('service/Oauth/get_center_info',{});
						   
							next(vm => {
									if(resourceData.status == 200){
										vm.userdata=resourceData.data.user;
									}else if(resourceData.status == 300){
							    vm.userdata=[];
										
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
	.title{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
