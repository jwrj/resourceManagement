<template>

	<div>
		<Card>
			<div slot="title">
				<h1>会间资源</h1>
			</div>
			<img-text :hideRadio="true" :datalist="datalist"  @search="searchList" @openDetail="openDetail">
<!-- 				<div slot="header" style="margin-bottom: 50px;">
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
						<Button 
						@click="resetResult" 
						v-if="result.length !== 0" 
						type="primary">清空
						</Button>
					</p>
				</div> -->
			</img-text>
		</Card>


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
				modalTitle:'',
				res_s: [],
				showImport: false,
				result: [],
				searchlist:{},
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
							handle: [
								{
									name: '查看详情',
									key: 0,
									modalShow:false,
									props: {
										loading: false
									}
								},
								],
					}
				],
				tableData:[
					{
						id: 1,
						name: '张三',
						date: '2016-10-03'
					},
					{
						id: 2,
						name: '李四',
						date: '2016-10-01'
					},
					{
						id: 3,
						name: '麻五',
						date: '2016-10-02'
					},
					{
						id: 4,
						name: '徐六',
						date: '2016-10-04'
					},
					{
						id: 5,
						name: '吴老七',
						date: '2016-10-04'
					}
				]

			}
		},
	methods: {//方法
		searchList(list){
		let arr=list.check;
		this.$set(this.searchlist,"title",list.word);
		this.$set(this.searchlist,"status",arr.join());
		this.$set(this.searchlist,"start_time",list.time[0]);
		this.$set(this.searchlist,"end_time",list.time[1]);
		this.$set(this.searchlist,"scope_release",'2');
		$ax.getAjaxData('service/Resource/index',Object.assign({}, this.searchlist), (res) =>{
			if(res.status == 200){
				this.datalist=res.data;
			}else if(res.status==300){
				this.datalist=[];
			}
		});
	
		},
	openDetail(id){
		let detailList=[];
			$ax.getAjaxData('service/Resource/detail',{id:id}, (res) =>{
				if(res.status == 200){
					detailList=res.data;
					this.$router.push({name: 'chamDetail', params: {list: detailList}});
				}else if(res.status==300){
					detailList=[];
				}
			});
			
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

		(async() => {//执行异步函数
			
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
			   let myPostData = await $ax.getAsyncAjaxData('service/Resource/index',{scope_release:"2"});
				   
					next(vm => {
							if(myPostData.status == 200){
								vm.datalist=myPostData.data;
							}
					});
				
			} catch(err) {
				console.log(err);
			}
			
			next();
			
		})();

		},

	}
</script>

<style scoped lang="less">

</style>
