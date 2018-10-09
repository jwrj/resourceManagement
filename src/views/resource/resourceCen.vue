<template>

	<div>
		<Card>
			<div slot="title">
				<h1>会间资源</h1>
			</div>
			<img-text @search="searchList">
				<div slot="header" style="margin-bottom: 50px;">
					<Button type="primary" @click="showImport=true">请选择商会</Button>
					<p style="margin-top: 5px;">
						已选商会:
						<Button style="margin: 5px;" v-for="(res,index) in result" :key="index">{{res}}
						</Button>
					</p>
					<p><Button @click="resetResult" v-if="result.length !== 0" type="primary">清空</Button></p>
				</div>
			</img-text>
		</Card>

		<Modal v-model="showImport" :mask-closable="false" title="请选择商会" @on-ok="getData" :width="800">
			<table-list :tableColumns="tableColumns" ref="selectCham" :chamber="result">
				<div slot="header">
					<al-cascader v-model="res_s" placeholder="选择地区" style="width: 300px;" />
				</div>
			</table-list>
		</Modal>
	</div>

</template>

<script>
	import imgText from '@/views/resource/component/imgText.vue'
	import tableList from '@/components/tableList/table-list.vue'
	export default {
		name: '',
		components: { //组件模板,
			imgText,
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
				datalist: [],
				res_s: [],
				showImport: false,
				result: [],
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
				]

			}
		},
		methods: { //方法
			searchList(list) {
				this.datalist = list;
				console.log('接收到了' + this.datalist.word);
			},
			getData() {
				let sk = this.$refs.selectCham.SelectData;
				console.log('youde');
				sk.forEach(item => {
					this.result.push(item.name)
				});

			},
			resetResult() {
				this.result = [];
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

</style>
