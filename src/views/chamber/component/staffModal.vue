<template>

	<div>

		<Modal v-model="show" title="添加会员" @on-cancel="close" :mask-closable="false" footer-hide>
			<Form ref="newstaff" :model="newstaff" :rules="ruleValidate" :label-width="80">
				<div class="title">
					<h2>已选会员</h2>
					<Button class="btnSmall" size="small" type="primary" @click="showadd">从会员库中选择</Button>
				</div>
				<Table border :highlight-row="true" :columns="columns" :data="row">
				</Table>
				<br>
				<FormItem label="任职时间" prop="holdtime">
					<DatePicker v-model="newstaff.holdtime" type="date"></DatePicker>
				</FormItem>
				<FormItem label="交接时间" prop="jointime">
					<DatePicker v-model="newstaff.jointime" type="date"></DatePicker>
				</FormItem>
				<FormItem label="相关附件" prop="attach">
					<Input v-model="newstaff.attach"></Input>
				</FormItem>

				<FormItem>
					<Button type="primary" @click="handleSubmit('newstaff')">确认添加</Button>
					<Button @click="handleReset('newstaff')" style="margin-left: 8px">清空</Button>
					<Button type="primary" ghost @click="close" style="margin-left: 8px">关闭</Button>
				</FormItem>

			</Form>
		</Modal>
		<Modal v-model="showAdd" :mask-closable="false" title="会员库" :width="700">
			<table-list :tableColumns="tableColumns">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">

					<post-casc style="margin-right: 10px;"></post-casc>

				</div>
			</table-list>
		</Modal>
	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'
	import postCasc from '@/components/post/post-casc.vue';
	export default {
		name: 'staffModal',
		components: { //组件模板,
			tableList,
			postCasc
		},
		props: { //组件道具（参数）
			/* ****属性用法*****
			 * 
			 * 传递类型 type: Array | Number | String | Object
			 * 为必传 required: true
			 * 默认值 default: ''
			 * this.$store.state.app.showstaffModal
			 */
			//modalShow:{
			//type:Boolean,
			//  default:false
			//}
		},
		data() { //数据
			return {
				showAdd: false,
				show:false,
				newstaff: {
					attach: '',
					holdtime: '',
					jointime: ''
				},
				ruleValidate: {
					jointime: [{
						required: true,
						type: 'date',
						message: '请选择日期',
						trigger: 'change'
					}],
					holdtime: [{
						required: true,
						type: 'date',
						message: '请选择日期',
						trigger: 'change'
					}]
				},
				tableColumns: [{
						type: 'selection'
					},
					{
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
				columns: [{
						title: 'Name',
						key: 'name'
					},
					{
						title: 'Age',
						key: 'age'
					},
					{
						title: 'Phone',
						key: 'phone'
					}
				],
				row: [{
						name: 'John Brown',
						age: 18,
						phone: '18298759875'
					},
					{
						name: 'Jim Green',
						age: 24,
						phone: '18268912754'
					},
					{
						name: 'Joe Black',
						age: 30,
						phone: '18278252222'
					},
					{
						name: 'Jon Snow',
						age: 26,
						phone: '17789523331'
					}
				]
			}
		},
		methods: { //方法,
			showadd() {
				this.showAdd = true
			},
			close() {
				let bool = false
				//this.$store.commit('showstaffModal', this.bool);
				this.show=false;
			},
			handleSubmit(name) {

				if (this.row.length !== 0) {
					this.$refs[name].validate((valid) => {
						if (valid) {
							let bool = false
							//this.$store.commit('showstaffModal', this.bool);
							this.show=bool;
							this.$Message.success('添加成功!');

						} else {
							this.$Message.error('添加失败!');
						}
					})
				} else {
					this.$Message.error('会员不可为空!');
				}
			},
			handleReset(name) {
				this.$refs[name].resetFields();

			}
		},
		computed: { //计算属性

			/*show: {
				get: function() {
					return this.$store.state.cham.showstaff
				},
				set: function() {

				},
			}*/
		},
		watch: { //监测数据变化

		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行
		},
		mounted() { //模板被渲染完毕之后执行

		}

	}
</script>

<style scoped lang="less">
	.ivu-modal-wrap {
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		-webkit-overflow-scrolling: touch;
		outline: 0;
		background-color: rgba(55, 55, 55, 0.6);
	}

	.bg .ivu-modal-wrap {
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		-webkit-overflow-scrolling: touch;
		outline: 0;
		background-color: rgba(55, 55, 55, 0.6);
	}

	.btnSmall {
		margin-left: auto;
	}

	.title {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
	}
</style>
