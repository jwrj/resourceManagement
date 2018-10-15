<template>
	
	<div>
		<Card>
			<h1 slot="title">政府账户审核</h1>
				<div>
					<Form :model="formInline">
						<slot name="header"></slot>
						<DatePicker 
						:value="formInline.time" 
						type="daterange" 
						split-panels 
						placeholder="选择时间"
						@on-change="formatTime"
						style="width: 200px">
						</DatePicker>
						
						<Input v-model="formInline.word" style="width: 200px;margin:0 5px;" />
						<Button type="primary" @click.native="search">搜索</Button>
						<p style="margin-top: 6px;">
							<CheckboxGroup v-model="formInline.check">
								<Checkbox label="等待审核"></Checkbox>
								<Checkbox label="审核通过"></Checkbox>
								<Checkbox label="审核不通过"></Checkbox>
							</CheckboxGroup>
						</p>
					</Form>
					<div class="imgtext" style="margin: 15px;">
						<div class="centent" v-for="(data,index) of datalist" :key="index" @click="rowclick(data)">
							<Icon type="md-image" size="120" />
							<div class="middle">
				<p>{{data.name}}</p>
			     <p>{{data.addr}}</p>
							</div>
							<hr>
			
						</div>
					</div>
					
				</div>
		</Card>
		
	</div>
	
</template>

<script>

export default {
	name: '',
	components:{//组件模板
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
        	formInline: {
        		check: [],
        		word: '',
        		time: []
        	},
			datalist:[
				{
					name:'张三丰',
					unit:'某某机关单位',
					unitLicense:true,
					prove:true,
					job:'联系专员',
					addr:'南宁市',
					card:true,
					unitAudit:'广西湖北商会',
					unitTime:'2018-01-09'
				}
			]
        }
    },
    methods: {//方法
    	search() {
    		console.log('搜索')
    	},
    	rowclick(data){
    		console.log('go')
    	},
    	formatTime(date){
    		this.formInline.time = date;
    	}
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
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
				next(vm => {
					
				});
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>
