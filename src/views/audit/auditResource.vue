<template>
	
	<div>
		<Card>
			<h1 slot="title">资源审核</h1>
			<img-text :datalist="datalist" @search="searchList" :showChoice="true"
			 @openDetail="openDetail" :hideRadio="true"  ref="showNews" :showSelected="true">
			</img-text>
			<Page :total="total" show-total
			 @on-change="pageChange" ref="pages"
			 :current="currentPage"
			 style="margin-top: 10px;margin-left: 30px;"/>
		</Card>
		
		
	</div>
	
</template>

<script>
import imgText from '@/views/resource/component/imgText.vue'
export default {
	name: '',
	components:{//组件模板,
	imgText
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
	},
    data () {//数据
        return {
        	datalist:[],
					routeName:'chamDetail',
					searchlist:[],
					currentPage:1,
					total:100
        }
    },
    methods: {//方法
    	searchList(list) {
				// this.$set(this.searchlist,"scope_release",this.range);
				let objList=[];
				let arr=list.check;
				this.$set(objList,"page",1);
				this.$set(objList,"title",list.word);
				this.$set(objList,"status",arr.join());			
				this.$set(objList,"start_time",list.time[0]);
				this.$set(objList,"end_time",list.time[1]);
				this.$set(objList,"society",list.society);
				this.searchlist =Object.assign({},objList);
				$ax.getAjaxData('service/Resource/preview_index',this.searchlist, (res) =>{
					if(res.status == 200){
						this.datalist=res.data;
						this.total = res.page_info.record_count;　
						this.$refs.pages.currentPage = 1;
					}else if(res.status==300){
						this.datalist=[];
					}
				});
				
    	},
		openDetail(data){   //政府不需要审核直接发布
				this.$router.push({ path: '/audit/chamDetail', query: { id:data.id}});		
		},
		pageChange(page){
			  //传页码给后端 获取每页要得到的数据
				this.searchlist.page = page;
				$ax.getAjaxData('service/Resource/preview_index',this.searchlist, (res) =>{
					if(res.status == 200){
						this.datalist=res.data;
					}else if(res.status==300){
						this.datalist=[];
					}
				});
		}
    },
    computed: {//计算属性
    },
    watch: {//监测数据变化
		searchlist(){
			this.currentPage = 1;
		}
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行

	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
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
			   let resourceData = await $ax.getAsyncAjaxData('service/Resource/preview_index',{page:1});
				   
					next(vm => {
							if(resourceData.status == 200){
								vm.datalist=resourceData.data;
								vm.total = resourceData.page_info.record_count;　
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
