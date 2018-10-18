<template>
	<div>
		<Form :model="formInline">
			<slot name="header"></slot>
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
				<CheckboxGroup v-model="formInline.check">
					<Checkbox label="等待审核"></Checkbox>
					<Checkbox label="审核通过"></Checkbox>
					<Checkbox label="审核不通过"></Checkbox>
				</CheckboxGroup>
			</p>
		</Form>
		<div class="imgtext" style="margin: 15px;">
			<div class="centent" v-for="(data,index) of datalist" :key="index" @click="rowclick(data)">
				<Icon type="md-image" size="120" />
				<div class="middle">
					<Row :gutter="16">
						<Col span="16">
						<h1>{{data.title}}</h1>
						</Col>
						<Col span="5" style="color: #F43838;">{{data.num}}</Col>
					</Row>
					<Row :gutter="8">
						<Col span="10">发布：{{data.person}}</Col>
						<Col span="10">职务：{{data.work}}</Col>
					</Row>
					<Row :gutter="16">
						<Col span="12">发布时间：{{data.start}}</Col>
						<Col span="12">结束时间：{{data.end}}</Col>
					</Row>

				</div>
				<hr>

			</div>
		</div>
		
	</div>

</template>

<script>
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
				default: () => [{
						title: '深圳宝安时尚创意云谷',
						num: '132万',
						person: '颜真卿',
						cham:'广西湖北商会',
						work: '名誉会长',
						start: '2018-01-15',
						end: '2018-09-18'
					},
					{
						title: '广东宝安时尚创意云谷',
						num: '132万',
						person: '颜真卿2',
						cham:'广西湖北商会1',
						work: '名誉会长',
						start: '2018-01-15',
						end: '2018-09-18'
					},
					{
						title:'中国(武汉·新洲)厨卫基地发展战略规划与招商策划案例',
						num: '132万',
						person: '张三丰',
						cham:'广西湖北商会2',
						work: '联系专员',
						start: '2018-01-15',
						end: '2018-09-18'
					}
				]
			}
		},
		data() { //数据
			return {
				formInline: {
					check: [],
					word: '',
					time: []
				}
			}
		},
		methods: { //方法
			search() {
				this.$emit('search',this.formInline);
			},
			rowclick(data){
				this.$emit('openview',data);
			},
			formatTime(date){
				this.formInline.time = date;
			}
		},
		computed: { //计算属性

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
