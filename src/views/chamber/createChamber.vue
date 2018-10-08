<template>

	<div class="createCham">
		<Card>
			<h1 slot="title">
				创建商会/协会
				<span class="zero"></span>
				<span>步骤：创建商会/协会</span>>
				<span>岗位配置</span>>
				<span>岗位任职</span>
			</h1>
			<Form :label-width="100" :model="link" ref="link" :rules="ruleValidate">

				<FormItem label="性质">
					<RadioGroup style="margin-top: -3px;" v-model="link.nature" @on-change="radiochange">
						<Radio label="商会" @click.native="view='chamber'"></Radio>
						<Radio label="协会" @click.native="view='society'"></Radio>
					</RadioGroup>
				</FormItem>
				<Row :gutter="24">
					<Col :lg="12" :md="16" :sm="24" :xs="24">
					<p class="cham" :is="view" ref="children"></p>
					</Col>

					<Col :lg="12" :md="16" :sm="24" :xs="24">
					<FormItem label="联系人" prop="linkman">
						<Input v-model="link.linkman" placeholder="请输入联系人" class="linkIn"></Input>
					</FormItem>
					<FormItem label="联系人电话" prop="linkphone">
						<Input v-model="link.linkphone" placeholder="请输入联系人电话" class="linkIn"></Input>
					</FormItem>

					<FormItem label="商会网址" prop="linkweb">
						<Input v-model="link.linkweb" placeholder="请输入商会网址" class="linkIn"></Input>
					</FormItem>
					<FormItem label="商会公众号" prop="linknum">
						<Input v-model="link.linknum" placeholder="请输入商会公众号" class="linkIn"></Input>
					</FormItem>
					<FormItem label="商会介绍" prop="linknote">
						<Input v-model="link.linknote" type="textarea" :autosize="{minRows: 2,maxRows: 7}" class="linkIn"></Input>
					</FormItem>
					</Col>
				</Row>
				<p style="margin-top: 15px;text-align: center;width: 80%;">
					<Button type="primary" @click="handleSubmit('link')">立即创建</Button>
				</p>
			</Form>
		</Card>
	</div>

	</div>

</template>

<script>
	import chamber from '@/views/chamber/component/chamber'
	import society from '@/views/chamber/component/society'
	export default {
		name: 'createChamber',
		components: { //组件模板,
			chamber,
			society
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

				view: 'chamber',
				link: {
					linkman: '',
					nature: '商会',
					linknum: '',
					linkweb: '',
					linkphone: '',
					linknote: '',
					society: []
				},
				ruleValidate: {
					linkman: [{
						required: true,
						message: '请填写联系人',
						trigger: 'blur'
					}],
					linkweb: [{
						required: true,
						message: '请填写网址',
						trigger: 'blur'
					}],
					linkphone: [{
							required: true,
							message: '请填写联系方式',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '不能小于6位数',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: { //方法
			handleSubmit(name) {
				this.$refs.children.$refs.children.validate((ft) => {
					console.log(ft);
					this.$refs[name].validate((valid) => {
						if (valid && ft) {
							this.$Message.success('添加成功!');
						} else {
							//this.$Message.error('添加失败!');
						}
					})
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$refs.children.$refs.children.resetFields();

			},
			radiochange() {

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

		}
	}
</script>

<style scoped lang="less">
	.createCham {
		margin: 5px;

		.title {
			font-size: 18px;
			font-weight: 700;
			color: black;
		}

		.tt {
			text-align: left;
			width: 100px;
			display: inline-block;
		}

		.space {
			margin-top: 5px;
			display: flex;
			align-items: center;
		}

		.zero {
			display: inline-block;
			width: 30px;
		}

		.linkIn {
			width: 300px;
		}
	}
</style>
