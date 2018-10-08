<template>

	<div id="payment">
		<Card>
			<h1 slot="title">缴费情况</h1>
			<div class="content" style="display: flex;">
				<div class="left" style="text-align: right;font-weight: 700;">
					<p>姓名：</p>
					<p>岗位：</p>
					<p>届次：</p>
					<p>届次时间：</p>
					<p>截至时间：</p>
					<p>岗位会费：</p>
				</div>
				<div class="right">
					<p>{{username}}</p>
					<p>{{work}}</p>
					<p style="color: red;">{{post_num}}</p>
					<p>{{post_from}}</p>
					<p>{{post_to}}</p>
					<p>{{price}}</p>
				</div>
			</div>
		</Card>
		<Card style="margin-top: 16px;">
			<div slot="title" class="title">
				<h1>缴费记录</h1>
				<Button class="btnSmall" size="small" type="primary" @click="addRecord">+添加条目</Button>
			</div>
			<table-list :tableColumns="tableColumns">

				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<p>
						<Select v-model="pay" placeholder="请选择缴费类别" style="width: 200px;">
							<Option value="both">全部</Option>
							<Option value="work">岗位会费</Option>
							<Option value="special">特殊会费</Option>
							<Option value="fund">基金会费</Option>
						</Select>
					</p>
				</div>

			</table-list>
			<Modal v-model="modalShow">
				<p slot="header">添加一条记录</p>
				<div>
					<Form :model="paying" ref="paying" :rules="ruleValidate" :label-width="80">

						<FormItem label="缴费类别:" prop="kind">

							<Select v-model="paying.kind" placeholder="请选择缴费类别" style="width: 200px;">
								<Option value="both">全部</Option>
								<Option value="work">岗位会费</Option>
								<Option value="special">特殊会费</Option>
								<Option value="fund">基金会费</Option>
							</Select>
						</FormItem>
						<FormItem label="金额:" prop="price">
							<Input style="width: 200px;" v-model="paying.price">
							<span slot="append">元</span>
							</Input>
						</FormItem>
						<FormItem label="时间:" prop="time">
							<DatePicker type="date" v-model="paying.time"></DatePicker>
						</FormItem>
						<FormItem label="缴纳方式:" prop="way">
							<Select v-model="paying.way" placeholder="请选择" style="width: 200px;">
								<Option value="wayOne">现金缴纳</Option>
								<Option value="wayTwo">对公转账</Option>
								<Option value="wayThree">基金冲减</Option>
							</Select>
						</FormItem>
						</Form>
				</div>
				<div slot="footer">
					<Button @click="modalShow = false">取消</Button>
					<Button type="primary" @click="handleSubmit('paying')">确定</Button>
				</div>
			</Modal>
		</Card>

	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
	export default {
		name: 'payMent',
		components: { //组件模板,
			tableList
		},
		props: { //组件道具（参数）
			/* ****属性用法*****
			 * 
			 * 传递类型 type: Array | Number | String | Object
			 * 为必传 required: true
			 * 默认值 default: ''
			 * 
			 */
		},
		data() { //数据
			return {
				username: '张三',
				work: '普通会员',
				post_num: '5',
				post_from: '2018-1-1',
				post_to: '2019-1-1',
				price: '100元',
				pay: 'both',
				paying: {
					price: '',
					kind: '',
					way: '',
					time: ''
				},
				modalShow: false,
				tableColumns: [{
						title: 'ID',
						key: 'id'
					},
					{
						title: '名称',
						key: 'name'
					},
					{
						title: '日期',
						key: 'date'
					},
					{
						align: 'center',
						width: 130,
						title: '操作',
						handle: [{
							name: '查看',
							key: 0,
							props: {
								loading: false
							}
						}],
					}
				],
				ruleValidate: {
					time: [{
						required: true,
						type: 'date',
						message: '请选择日期',
						trigger: 'change'
					}],
					price: [{
						required: true,
						message: '请填写金额',
						trigger: 'blur'
					}],
					kind: [{
						required: true,
						message: '请选择类别',
						trigger: 'blur'
					}],
					way: [{
						required: true,
						message: '请选择方式',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: { //方法
			addRecord() {
				this.modalShow = true;
			},
      handleSubmit(name) {
					this.$refs[name].validate((valid) => {
						if (valid) {
						this.$Message.success('添加成功!');		
					    this.modalShow=false;
						} else {
						//this.$Message.error('添加失败!');
						}	
				})
			}
		},
		computed: { //计算属性

		},
		watch: { //监测数据变化

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
	.btnSmall {
		margin-left: auto;
	}
	.title {
		display: flex;
		align-items: center;
	}
</style>
