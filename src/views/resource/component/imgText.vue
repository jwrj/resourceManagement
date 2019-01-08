<template>
	<div>
		<Form :model="formInline" >
			<slot name="header"></slot>
<div v-if="showSelected">
	<Button type="primary" @click="showImport=true">
						请选择商会
					</Button>
					<p style="margin-top: 5px;">
						已选商会:
						<Tag 
						color="primary"
						type="border"
						closable
						:name="res.id"
						v-for="(res,index) in result" 
						:key="index"
						@on-close="closeTag(res,index)"
						>{{res.name}}
						</Tag>
					</p>
					<p style="margin-bottom: 5px;">
						<Button @click="resetResult" 
						v-if="result.length !== 0" 
						type="primary">清空
						</Button>
					</p>
				</div>
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
 	 <div class="centent" :class="{active: `${data.id}+${index}`=== active ||`${data.rid}+${index}`===active}"
			 v-for="(data,index) of datalist" :key="index" @mouseenter="data.id?active=`${data.id}+${index}`:active=`${data.rid}+${index}`"
			 @mouseleave="active=''">
<!-- 			 <div class="centent" :class="{active: data.id=== active ||data.rid===active}"
			 		v-for="(data,index) of datalist" :key="index" @mouseenter="data.id?active=data.id:active=data.rid"
			 		@mouseleave="active=''"> -->
			 <!-- <Icon type="ios-trash-outline" size="30" @click.native.stop="delRes(data.id)" v-if="isPost" /> -->
				<Icon type="md-image" size="120" @click="rowclick(data)"/>
				<div class="middle" style="flex: 2;">
						<Row :gutter="16">
						<Col span="10" >
						<h1 class="title" @click="rowclick(data)">{{data.title}}</h1>
						</Col>
						<Col span="6" style="color: #F43838;" v-if="data.invest_money">{{data.invest_money |Trans}}</Col>
				<!-- 		<Col span="3" style="color: #F43838;" v-if="data.total_money">{{data.total_money |Trans}}</Col> -->
						<Col span="3" v-if="postSign"><img v-if="isaudit(data)" src="../../../assets/img/default-img/audit.png" alt="审核通过" width="80" height="60"></Col>
						<Col span="3" v-if="postSign"><img v-if="isget(data)" src="../../../assets/img/default-img/get.png" alt="已有承接" width="80" height="60"></Col>
					</Row>
					
					<Row :gutter="16">
						<Col span="12"  v-if="defaultShow">发布用户：{{data.release_people.center_name || data.center_name}}</Col>
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
					<Row :gutter="16" v-if="resgov">
						<Col span="12" >用户职务：{{data.uinfo.office}}</Col>
						<Col span="12" >结束时间：{{data.end_time}}</Col>	
					</Row>
				</div>
      <Icon  style="margin-right: 10px;" type="ios-trash-outline" size="30" @click.native.stop="delRes(data.id)" v-if="isPost" />
			</div>
		</div>
		<Modal 
		v-model="showImport" 
		:mask-closable="false" 
		title="请选择商会"
		@on-ok="getData" 
		:width="800">
			<xw-table
			:tableColumns="tableColumns" 
			ref="selectCham" 
			:tableData="tableData"
			>
			</xw-table>
		</Modal>
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
			},
			resgov:{
				type:Boolean,
				default:false
			},
			showChoice:{
				type:Boolean,
				default:false
			},
			showSelected:{
				type:Boolean,
				default:false
			},
			defaultShow:{
				type:Boolean,
				default:true
			},
			isPost:{
				type:Boolean,
				default:false
			},
			postSign:{
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
					range:'1',
					society:[]
				},
				active:'',
				userdata:[],
				result:[],
				tableData:[],
				showImport: false,
				tableColumns: [{
						type: 'selection',
						width:80
					},
					{
						title: 'ID',
						key: 'id'
					},
					{
						title: '名称',
						key: 'name'
					}
				]
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
			},
			closeTag(res,index){
			//关闭标签触发
			for(let i=0;i<this.result.length;i++){
				if(this.result[i].name==res.name){
					this.result.splice(i,1)
					this.tableData.forEach(item => {
    			if(item.id === res.id){
      				this.$set(item, '_checked', false);
    			}
    		});
				}
			}
			this.formInline.society = this.selected;
			this.search();
		},
		resetResult() {//清空
			this.result = [];
			this.formInline.society = [];
		  this.tableData.forEach(item=>{
				this.$set(item, '_checked', false);
			});

			this.search();
		},
		getData() {//获取选中的数据并去重 去重待改进
					let sk = this.$refs.selectCham.checkedData;	
					let res = sk;
				for(let i = 0; i < this.result.length; i++){
						let item = this.result[i];
						var repeat = false;
						for (let j = 0; j < res.length; j++) {
								if (item.id == res[j].id) {
										repeat = true;
										break;
								}
						}
						if (!repeat) {
								res.push(item);
						}
				}
				this.result=res;
				this.formInline.society = this.selected;
				this.search();//提交一次
				
				},
		delRes(resId){ //删除资源
			  this.$emit('delRes',resId);      
		}
	},
		computed: { //计算属性
			selected(){
				let arr=[]
				for(let i of this.result){
					if(i.name){
						arr.push(i.id);
					}
				}
				arr=arr.join();
				return arr;
			},
			isget(){
				return function(obj){
			  if(obj.contract_count>0){
					return true;
				}				
				}
			},
			isaudit(){
				return function(obj){
				if(obj.status==1){
					return true;
				}				
				}
			}
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
			 $ax.getAjaxData('service/Oauth/allOrgList',{}, res => {				
			 	if(res.status == 200){
					let newArr = [];
					res.data.forEach(item => {
						newArr.push({
							name:item.name,
							id: item.org_unid
						});
					});
					this.tableData = newArr;
			 	}
			 });
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
		cursor:pointer;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.active{
		background: #D9EDF7;
	}
</style>
