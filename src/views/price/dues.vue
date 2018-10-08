<template>

	<div>
		<Card>
			<div slot="title">
				<h1>会费情况-查看岗位的缴费情况</h1>
			</div>
			<table-list :tableColumns="tableColumns" :seekShow="false">
				<div slot="header" style="display: flex;">
					<div><post-casc style="margin-right: 10px;"></post-casc></div>
            <Select v-model="statescreen" placeholder="会费情况" style="width: 150px;margin-right: 10px;">
							<Option value="全部">全部</Option>
							<Option value="欠费">欠费</Option>
							<Option value="缴清">缴清</Option>
            </Select>
						<Select v-model="modescreen" placeholder="缴纳方式" style="width: 150px;">
							<Option value="全部">全部</Option>
							<Option value="现金缴纳">现金缴纳</Option>
							<Option value="对公转账">对公转账</Option>
							<Option value="基金冲减">基金冲减</Option>
						</Select>
				</div>
  <pay-ment slot="modalContent"></pay-ment>
			</table-list>
		</Card>


	</div>

</template>

<script>
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
    import payMent from '@/views/price/payment.vue'
	export default {
		name: '',
		components: { //组件模板,
			postCasc,
			tableList,
			payMent
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
				modescreen: '',
				statescreen: '',
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
							name: '查看详情',
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
 .radio{
	margin-right: 6px;
}
</style>
