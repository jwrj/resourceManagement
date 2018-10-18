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
							<Icon type="md-image" size="180" />
							<div class="middle">
						<p>
							<div class="user">{{data.name}}</div>
						<span style="color: #AAAAAA;">注册时间：2018-01-18</span>
						</p>
				
				<Row type="flex" justify="start" align="top" >
					<Col span="8">
						<div style="display: flex;">
							<div>

								<p>单位</p>
								<p>职务</p>
								<p>地区</p>
							</div>
							<div>
								<p>：{{data.unit}}</p>
								<p>：{{data.job}}</p>
								<p>：{{data.addr}}</p>
							</div>
						</div>
					</Col>
					
					<Col span="8">				
					<div style="display: flex;">
						<div>
							<p>单位执照</p>
							<p>身份证</p>
							<p>单位证明</p>
						</div>
						<div>
							<p >：{{data.unitLicense | flag}}</p>
							<p>：{{data.card | flag}}</p>
							<p>：{{data.prove | flag}}</p>
						</div>
					</div>
					</Col>
					<Col span="8">

						<div style="display: flex;">
							<div>
								<p>审核单位</p>
								<p>审核时间</p>
							</div>
							<div>
								<p>：{{data.unitAudit}}</p>
								<p>：{{data.unitTime}}</p>
							</div>
						</div>
					</Col>
				</Row>
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
			pageShow:true,
			datalist:[
				{
					name:'张三丰',
					unit:'某某机关单位',
					unitLicense:['http://yuanxing.bzttech.com/cocsys/coc_resourceSystem/images/%E5%8F%91%E5%B8%83%E8%B5%84%E6%BA%90-%E4%BC%9A%E5%86%85%E4%BC%9A%E9%97%B4/u708.png'],
					prove:[],
					job:'联系专员',
					addr:'南宁市',
					card:'45080957864058',
					unitAudit:'广西湖北商会',
					unitTime:'2018-01-09'
				},
				{
					name:'白展堂',
					unit:'同福客栈文艺酒店',
					unitLicense:[],
					prove:['链接1'],
					job:'联系专员',
					addr:'南宁市',
					card:'',
					unitAudit:'广西湖北商会',
					unitTime:'2018-11-15'
				}
			]
        }
    },
    methods: {//方法
    	search() {
    		console.log('搜索')
    	},
    	rowclick(data){
    		this.$router.push({name: 'accountDetail', params: {datalist: data}});
    	},
    	formatTime(date){
    		this.formInline.time = date;
    	}
    },
    computed: {//计算属性
	
// 		text(){
// 			
// 			let txt = '未上传';
// 			
// 			if(JSON.stringify(value) === '[]'||JSON.stringify(value)===''){
// 				txt = '';
// 			}else{
// 				txt = '';
// 			}
// 			
// 			return txt;
// 			
// 		}
		
		
    },
    watch: {//监测数据变化

	},
    filters:{
		
		flag:function(value){
			
			if(JSON.stringify(value) !== '[]'&& value.length!==0){
				return '已上传'
			}else{
				return '未上传'
			}
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
	.centent {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #BBBBBB;
	}
	.middle{
		flex: 3;
	}
     .user{
		 font-size: 18px;
		 font-weight: 700;
		 margin-right: 5px;
	 }
</style>
