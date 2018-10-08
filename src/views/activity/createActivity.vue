<template>

	<div>
		<Card>
			<div slot="title">
				<h1>创建活动/会议</h1>
			</div>
			<Form ref="activity" :model="activity" :rules="ruleValidate" :label-width="130">
				<FormItem label="活动/会议标题" prop="name">
					<Input v-model="activity.name" style="width: 300px;"></Input>
				</FormItem>
				<FormItem label="开始时间" prop="starting">
					<DatePicker v-model="activity.starting" type="datetime" format="yyyy-MM-dd HH:mm"></DatePicker>
				</FormItem>
				<FormItem label="结束时间" prop="ending">
					<DatePicker v-model="activity.ending" type="datetime" format="yyyy-MM-dd HH:mm"></DatePicker>
				</FormItem>
				<FormItem label="会议地址">
					<Input v-model="activity.where" style="width: 400px;"></Input>
				</FormItem>
				<FormItem label="是否住宿" prop="live">
					<RadioGroup v-model="activity.live">
						<Radio label="是"></Radio>
						<Radio label="否"></Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="住宿地址" v-if="activity.live=='是'">
					<Input v-model="activity.address" style="width: 400px;"></Input>
				</FormItem>

			</Form>
		</Card>
        <Card style="margin-top: 16px;">
					<h1 slot="title">会议说明</h1>
		<UEditor :configs='editor_config'></UEditor>
			</Card>
		<Card style="margin-top: 16px;height: 600px;">

			<h1 slot="title">文件管理</h1>

			<file-manage currentRouteName="createActivity"></file-manage>

		</Card>

		<Card style="margin-top: 16px;height: 600px;">
			<div slot="title" class="title">
				<h1>邀请人员</h1>
				<Button class="btnSmall" size="small" type="primary" @click="importPerson">导入更多会员</Button>
			</div>
			<table-list :tableColumns="tableColumns">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">

					<post-casc style="margin-right: 10px;"></post-casc>

				</div>
			</table-list>
			<br>
			    <div style="margin: 0 45%;">
      <Button type="primary"  @click="handleSubmit('activity')">创建会议</Button>
    </div>
		</Card>

		<Modal v-model="showImport" :mask-closable="false" title="会员库" :width="700">
			<table-list :tableColumns="tableColumns">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">

					<post-casc style="margin-right: 10px;"></post-casc>

				</div>
			</table-list>
		</Modal>
		
	</div>

</template>

<script>
	import fileManage from '@/components/fileManage/file-manage.vue'; //文件管理
	import tableList from '@/components/tableList/table-list.vue'
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import UEditor from '@/components/richTextEditor/UEditor.vue';//富文本编辑器
	export default {
		name: '',
		components: { //组件模板,
			fileManage,
			tableList,
			postCasc,
			UEditor
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
				showImport: false,
				activity: {
					name: '',
					starting: '',
					ending: '',
					where: '',
					address: '',
					live: '是'
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '请填写会议名称',
						trigger: 'blur'
					}],
					starting: [{
						required: true,
						type: 'date',
						message: '请选择开始时间',
						trigger: 'change'
					}],
					ending: [{
						required: true,
						type: 'date',
						message: '请选择结束时间',
						trigger: 'change'
					}],
					live: [{
						required: true,
						message: '请选择一项',
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
				]
			}
		},
		methods: { //方法
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Message.success('添加成功!');
					} else {
						this.$Message.error('添加失败!');
					}
				})
			},
			importPerson() {
				this.showImport = true;
			},
			get_editor_content(v) {
				this.editor_content = v;
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
