<template>

	<div>
		<Card>
			<div slot="title">
				<h1>会间资源</h1>
			</div>
			<img-text :resIn="true" :hideRadio="true" :datalist="datalist"  
			@search="searchList" @openDetail="openDetail"></img-text>
			<Page :total="total" show-total ref="pages"
			@on-change="pageChange" :current="currentPage"
			style="margin-top: 10px;margin-left: 30px;"/>
		</Card>


	</div>

</template>

<script>
	import imgText from '@/views/resource/component/imgText.vue'
	export default {
		name: '',
		components: { //组件模板,
			imgText
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
            datalist:[],
						searchlist:{},
						total:100,
						currentPage:1
			}
		},
	methods: {//方法
		searchList(list){
		let arr=list.check;
		this.$set(this.searchlist,"page",1);
		this.$set(this.searchlist,"title",list.word);
		this.$set(this.searchlist,"status",arr.join());
		this.$set(this.searchlist,"start_time",list.time[0]);
		this.$set(this.searchlist,"end_time",list.time[1]);
		$ax.getAjaxData('service/Resource/external_index',Object.assign({}, this.searchlist), (res) =>{
			if(res.status == 200){
				this.datalist=res.data;
				this.total = res.page_info.record_count;
				this.$refs.pages.currentPage = 1;
			}else if(res.status==300){
				this.datalist=[];
			}
		});
	
		},
			openDetail(data){
						this.$router.push({ path: '/audit/chamDetail', query: { id:data.id}});
			},
			pageChange(page){
					//传页码给后端 获取每页要得到的数据
					this.searchlist.page = page;
					$ax.getAjaxData('service/Resource/external_index',this.searchlist, (res) =>{
						if(res.status == 200){
							this.datalist=res.data;
						}else if(res.status==300){
							this.datalist=[];
						}
					});
			}
		},

		computed: { //计算属性

		},
		watch: { //监测数据变化
      searchlist(){
      	this.currentPage = 1;
      }
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
			   let myPostData = await $ax.getAsyncAjaxData('service/Resource/external_index',{});
				   
					next(vm => {
							if(myPostData.status == 200){
								vm.datalist=myPostData.data;
								vm.total = myPostData.page_info.record_count;　
							}else if(myPostData.status == 300){
								alert(myPostData.message)
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
