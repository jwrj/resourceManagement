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
							<CheckboxGroup v-model="formInline.check" @on-change="search">
								<Checkbox label="0">审核中</Checkbox>
								<Checkbox label="1">审核通过</Checkbox>
								<Checkbox label="2">审核不通过</Checkbox>
							</CheckboxGroup>
						</p>
					</Form>
					<div class="imgtext" style="margin: 15px;">
						<div class="centent" v-for="(data,index) of datalist" :key="index" @click="rowclick(data)">
							<Icon type="md-image" size="180" />
							<div class="middle">
						<p>
							<div class="user">{{data.person.truest_name}}</div>
						<span style="color: #AAAAAA;">注册时间：{{data.person.addtime | formatDate}}</span>
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
								<p>：{{data.office}}</p>
								<p>：{{data.person.hometown}}</p>
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
							<p >：{{data.unit_license | flag}}</p>
							<p>：{{data.person.card_img | flag}}</p>
							<p>：{{data.unit_prove | flag}}</p>
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
								<p>：{{data.reg_time}}</p>
								<p>：{{data.last_time}}</p>
							</div>
						</div>
					</Col>
				</Row>
							</div>
							<hr>

						</div>
						 <Page :total="100" show-total  style="margin-top: 10px;margin-left: 30px;"/>
					</div>
					
				</div>
		</Card>

	</div>
	
</template>

<script>
import {formatDate} from '../../../public/js/date.js'
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
			datalist:[]

        }
    },
    methods: {//方法
    	search() {
//     		let objList=[];
//     		let arr=formInline.check;  		
//     		this.$set(objList,"title",list.word);
//     		this.$set(objList,"status",arr.join());			
//     		this.$set(objList,"start_time",list.time[0]);
//     		this.$set(objList,"end_time",list.time[1]);
//     		this.$set(objList,"society",list.society);
//     		// this.$set(objList,"scope_release",);
//     		this.searchlist =Object.assign({},objList);
//     		$ax.getAjaxData('service/Resource/preview_index',this.searchlist, (res) =>{
//     			if(res.status == 200){
//     				this.datalist=res.data;
//     			}else if(res.status==300){
//     				this.datalist=[];
//     			}
//     		});
    	},
    	rowclick(data){
    		this.$router.push({ path: '/audit/accountDetail', query: { id:data.id}});
    	},
    	formatTime(date){
    		this.formInline.time = date;
    	}
    },
    computed: {//计算属性

		
    },

    watch: {//监测数据变化
//        formInline:{
//            handler(curVal,oldVal){
//                 console.log(curVal);
//             },
//             deep: true,
// 	   }
	   
	},
    filters:{
		
		flag:function(value){
			
			if(JSON.stringify(value) !== '[]'&& value.length!==0){
				return '已上传'
			}else{
				return '未上传'
			}
		},
				formatDate(time) {
						var date = new Date(time*1000);
						return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
					   let resourceData = await $ax.getAsyncAjaxData('service/User/gov_user',{});
						   
							next(vm => {
									if(resourceData.status == 200){
										vm.datalist=resourceData.data;		 
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
