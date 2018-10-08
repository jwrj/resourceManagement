<template>

	<div>
		<Card>
			<div slot="title" class="title">
				<h1>届次配置</h1>
				<Button class="btnSmall" size="small" type="primary" @click="addSession">添加届次</Button>
			</div>
			<table-list :tableColumns="tableColumns">

				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<post-casc style="margin-right: 10px;"></post-casc>

				</div>

			</table-list>
			
			<Modal 
			v-model="showSess"
			title="添加届次"
			footer-hide>
				<Form :model="formItem" :label-width="80">
        <FormItem label="届次名称:">
            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
        </FormItem>
		<FormItem label="开始时间:">
			<DatePicker v-model="formItem.starting" type="date"></DatePicker>
		</FormItem>
		<FormItem label="到期时间:">
			<DatePicker v-model="formItem.ending" type="date"></DatePicker>
		</FormItem>
		<FormItem label="会费标准:">
			<Input v-model="formItem.price" placeholder="Enter something..."></Input>
		</FormItem>				<FormItem>
					<Button type="primary" size="large" @click.stop="add">确定添加</Button>
				</FormItem>
				</Form>

			</Modal>
			
		</Card>


	</div>

</template>

<script>
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import tableList from '@/components/tableList/table-list.vue';//表格列表组件
	export default {
		name: '',
		components: { //组件模板,
			postCasc,
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
				showSess:false,
				formItem:{
					name:'',
					starting:'',
					ending:'',
					price:''
				},
				tableColumns: [{
						title: 'ID',
						key: 'id'
					},
					{
						title: '届次',
						key: 'name'
					},
					{
						title: '开始时间',
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
			addSession(){
				this.showSess=true;
			},
			add(){
				console.log(this.formItem);
				this.showSess=false;
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
