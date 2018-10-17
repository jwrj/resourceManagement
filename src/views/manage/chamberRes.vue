<template>

	<div>
		<Card>
			<div slot="title">
				<h1>发布资源</h1>
			</div>
			<div class="news">
				<span> <strong>发布人信息</strong></span>
				<span>姓名：张三</span>
				<span>会内职务：会长</span>
				<span> 身份证号：450112345678123</span>
				<span>联系电话：0771-1234567</span>
				<span>手机：15612341234</span>
			</div>
			<br>
			
		<Form :model="resList" 
		:rules="ruleValidate" 
		label-position="right"
		:label-width="100"
		ref="link" 
		style="margin-top: 5px;">
					<FormItem label="标题" prop="title">
						<Input v-model="resList.title" 
						type="text" style="width: 200px;">
						</Input>
					</FormItem>
					
			<FormItem label="发布范围">
				<Button :type="inter==true ? 'error' : 'primary'" 
				style="margin-right: 5px;"
				 @click="inter=true,out=false">
				 会内
				 </Button>
				<Button :type="out==true ? 'error' : 'primary'" 
				@click="inter=false,out=true">
				会外
				</Button>
			
			<div v-if="out==true" style="margin-top: 30px;">
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
				<p>
					<Button @click="resetResult" 
					v-if="result.length !== 0" 
					type="primary">清空
					</Button>
				</p>
			</div>
			</FormItem>
				<Row>
					<Col :lg="12" :md="16" :sm="24" :xs="24">
					<FormItem label="起始时间" prop="time">
						<DatePicker 
						v-model="resList.time" 
						type="daterange" 
						split-panels placeholder="选择时间" 
						style="width: 200px">
						</DatePicker>
					</FormItem>
					<FormItem label="项目总额" prop="num">
						<Input v-model="resList.num" 
						type="text" 
						style="width: 200px;">
						<span slot="append">万元</span>
						</Input>
					</FormItem>
					<FormItem label="担保金额" prop="assure">
						<Input v-model="resList.assure" 
						type="text" style="width: 200px;">
						<span slot="append">万元</span>
						</Input>
					</FormItem>
					<FormItem label="介绍费用" prop="price">
						<Input v-model="resList.price" 
						type="text" style="width: 200px;">
						<span slot="append">万元</span>
						</Input>
					</FormItem>
					</Col>
					<Col :lg="12" :md="16" :sm="24" :xs="24">
					<FormItem label="资质需求">
						<Input v-model="resList.need" 
						type="text" style="width: 200px;">
						</Input>
					</FormItem>
					<FormItem label="项目周期">
						<Input v-model="resList.circle" 
						type="text" style="width: 200px;">
						</Input>
					</FormItem>
					<FormItem label="交付地点">
						<Input v-model="resList.place" 
						type="text" style="width: 200px;">
						</Input>
					</FormItem>
					<FormItem label="协助成都">
						<Input v-model="resList.help" 
						type="text" style="width: 200px;">
						</Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</Card>
		<Card style="margin-top: 16px;">
			<h1 slot="title">项目介绍</h1>
		<UEditor :configs='editor_config'></UEditor>
		</Card>
		<Card style="margin-top: 16px;height: 600px;">
		
					<h1 slot="title">附件文件夹</h1>
		
					<file-manage currentRouteName="createActivity"></file-manage>
		<p style="margin-top: 15px;text-align: center;width: 100%;">
			<Button type="primary" 
			@click="handleSubmit('link')">
			立即创建
			</Button>
		</p>
				</Card>
		<Modal 
		v-model="showImport" 
		:mask-closable="false" 
		title="请选择商会"
		@on-ok="getData" 
		:width="800">
			<table-list 
			:tableColumns="tableColumns" 
			ref="selectCham" 
			:chamber="result"
			:tableData="tableData"
			>
				<div slot="header">
					<al-cascader v-model="res_s" placeholder="选择地区" style="width: 300px;" />
				</div>
			</table-list>
		</Modal>

	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'
	import UEditor from '@/components/richTextEditor/UEditor.vue';//富文本编辑器
	import fileManage from '@/components/fileManage/file-manage.vue'; //文件管理
	export default {
		name: '',
		components: { //组件模板,
			tableList,
			UEditor,
			fileManage
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
				editor_config:{
						width:'100%',
						height:'500px'
				},
				inter: true,
				out: false,
				res_s: [],
				showImport: false,
				result: [],
				resList: {
					need: '',
					circle: '',
					help: '',
					title:'',
					palce: '',
					time: [],
					num: '',
					assure: ''
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
					}
				],
				tableData:[
					{
						id: 1,
						name: '张三的商会',
						date: '2016-10-03'
					},
					{
						id: 2,
						name: '李四的商会',
						date: '2016-10-01'
					},
					{
						id: 3,
						name: '麻五的商会',
						date: '2016-10-02'
					},
					{
						id: 4,
						name: '徐六的商会',
						date: '2016-10-04'
					},
					{
						id: 5,
						name: '吴老七的商会',
						date: '2016-10-04'
					}
				],
				ruleValidate: {
					time: [{
						type: 'array',
						required: true,
						fields: {
							0: {
								type: 'date',
								required: true,
								message: '请输入起止日期'
							},
							1: {
								type: 'date',
								required: true,
								message: '请输入起止日期'
							}
						}
					}],
					num: [{
						required: true,
						message: '请填写项目总额',
						trigger: 'blur'
					}],
					assure: [{
						required: true,
						message: '请填写担保金额',
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: '标题不能为空',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请填写介绍费用',
						trigger: 'blur'
					}]
				}
			}
		},

		methods: { //方法
			getData() {//获取选中的数据并去重 去重待改进
				let sk = this.$refs.selectCham.checkedData;
			// this.result = this.result.concat(sk);			
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
			this.$refs.selectCham.tableData.forEach(item => { //去掉默认选中
			this.$set(item, '_checked', false);
			});
			
			},
			resetResult() {//清空
				this.result = [];
				this.$refs.selectCham.checkedData=[];
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Message.success('添加成功!');
					} else {
						//this.$Message.error('添加失败!');
					}
				})
			},
			closeTag(res,index){
				//关闭标签触发
				for(let i=0;i<this.result.length;i++){
					if(this.result[i].name==res.name){
						this.result.splice(i,1)
						
					}
				}
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
	.news span {
		padding: 5px 5px 5px 0;
	}
	.news{
		margin-left: 30px;
	}
</style>
