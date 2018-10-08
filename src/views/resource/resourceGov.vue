<template>

	<div>
		<Card>
			<div slot="title">
				<h1>政府资源</h1>
			</div>
			<div>
						<div class="content">
							<p class="choice" :style="{background:'#fff',padding:'10px'}">
					       <slot name="header"></slot>
						   <Row >
						<Col span="10">
							
							<Button type="info">选择省</Button><Button type="info">选择市</Button>
							<p><Button type="info">商会名称123</Button></p>
							<Button class="children">下属商会1</Button><Button class="children">下属商会2</Button><Button class="children">下属商会3</Button>
						</Col>
						<Col span="14"  :style="{minHeight:'150px'}" class="yx" >
						<div :style="{padding:'10px'}">
							<p class="title">已选条件</p>
								<Badge text='X' type="warning" v-for="(data,index) in xs" :key="index">
				<Button class="children">{{data}}</Button >
					</Badge>
				
						</div>
						</Col>
					</Row>
							</p>
						</div>
			</div>
			<img-text @search="searchList"></img-text>
			
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
			xs:['下属商会1','下属商会2','下属商会3','下属商会4']

			}
		},
		methods: { //方法
      searchList(list){
		  this.datalist=list;
	   console.log('政府资源'+this.datalist.word);
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
	.content{
		margin: 12px 0;
	}
	.title{
		font-size: 20px;
		font-family: "arial black";
		font-weight: 700;
	}
	Button{
		margin: 5px 3px;
		width: 100px;
		height: 30px;
		border-radius: none;
	}
	.children{
		background: #c5c8ce;
		color: white;
	}
	.yx{
		border-left: 1px solid #c5c8ce;
	     top: -9px;
		display: flex;
		align-items: flex-start;
	}
</style>
