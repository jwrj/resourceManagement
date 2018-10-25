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
						<Col span="6">
						<h1>{{data.title}}</h1>
						</Col>
						<Col span="6" style="color: #F43838;">132万</Col>
					</Row>
					<Row :gutter="8">
						<Col span="6">发布：{{userlist.username}}</Col>
						<Col span="6">职务：{{userlist.office}}</Col>
					</Row>
					<Row :gutter="16">
						<Col span="6">发布时间：{{data.create_time}}</Col>
						<Col span="6">公司：{{userlist.unit}}</Col>
					</Row>
							

				</div>
				<hr>

			</div>
		</div>
		
	</div>

</template>

<script>
import {bus} from '@/components/bus/event-bus.js'
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
				if(this.formInline.range!==3){
				this.$emit('openDetail',data.id);
				// this.$router.push({name:'chamDetail', params: {list:bus.currentResource}});
				}else if (this.formInline.range===3){
				bus.$emit('govDetail',data.name);	
				this.$router.push({name:'govDetail', params: {list:bus.currentResource}});
				}
				
			},
			formatTime(date){
				this.formInline.time = date;
			}
		},
		computed: { //计算属性
			userlist(){
						  // 取值时：把获取到的Json字符串转换回对象
				
				var userJsonStr = sessionStorage.getItem('user');
			
			var	userEntity = JSON.parse(userJsonStr);
				this.$set(this.userdata,"unit",userEntity.unit);
				this.$set(this.userdata,"department",userEntity.department);
				this.$set(this.userdata,"username",userEntity.username);
				this.$set(this.userdata,"office",userEntity.office);
			  return this.userdata;	
		}
		},
		watch: { //监测数据变化,
		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行

		},
		mounted() { //模板被渲染完毕之后执行	
		},

		//=================组件路由勾子==============================

		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

			(async () => { //执行异步函数

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

				} catch (err) {
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
		border-bottom: 1px solid #BBBBBB;
	}
</style>
