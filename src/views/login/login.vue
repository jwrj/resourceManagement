<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
			 <Card style="width: 400px;margin: auto;" >
				 <h1 slot="title">欢迎您！</h1>	
				 <div v-if="show">
					 							
					 		<span style="font-size: 12px;" class="bold">请选择用户类型：</span>
					 		<RadioGroup v-model="datalist.user_type">
					 						<Radio label="1">普通用户</Radio>
					 						<Radio label="2">政府用户</Radio>
					 					</RadioGroup>
					 		<Form  :model="datalist" v-if="datalist.user_type ==2">
					 			<FormItem label="单位名称:" >
					 					<Input type="text" v-model="datalist.unit"> </Input>
					 			</FormItem>
					 			<FormItem label="所属部门:" >
					 					<Input type="text" v-model="datalist.department"> </Input>
					 			</FormItem>
					 			<FormItem label="职位:" >
					 					<Input type="text" v-model="datalist.office"> </Input>
					 			</FormItem>
					 			<FormItem label="单位执照:">
					 								<Upload
					 								:multiple="true"
					 								name="image"
					 								:on-success="uploadLicense"
					 								:on-remove='upremoveLicense'
					 								action="http://192.168.2.251:8083/index.php/service/Uploadfile/simple_itf">
					 									<Button icon="ios-cloud-upload-outline">选择文件</Button>
					 								</Upload>
					 			</FormItem>
					 			<FormItem label="单位证明:">
					 							<Upload
					 							:multiple="true"
					 							name="image"
					 							:on-success="uploadProve"
					 							:on-remove='upremoveProve'
					 							action="http://192.168.2.251:8083/index.php/service/Uploadfile/simple_itf">
					 								<Button icon="ios-cloud-upload-outline">选择文件</Button>
					 							</Upload>
					 			</FormItem>
					 			<FormItem label="单位联系人:" >
					 					<Input type="text" v-model="datalist.unit_contact"> </Input>
					 			</FormItem>
					 			<FormItem label="单位联系电话:" >
					 					<Input type="text" v-model="datalist.unit_telphone"> </Input>
					 			</FormItem>
					 	</Form>
					 	
					 	<p>
					 		<Button type="primary" @click="submit(datalist.user_type)" style="margin: 10px 0;">确定提交</Button>
					 	</p>
				 </div>
				 
				 <div v-if="selectCompany">
					 请选择公司：
					 <Select v-model="company" style="width:200px" >
							<Option v-for="item in companySelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
					 </Select>
					 <Button type="primary" @click="selectSuc" style="margin: 10px 0;">确定进入</Button>
				 </div>
				 
			 </Card>

	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import postCasc from '@/components/post/post-casc.vue';//岗位级联

export default {
	name: 'login',
	components:{//组件模板
		tableList,
		industryCasc,
		postCasc
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

					// GovShow:false,
         datalist:{
					 unit:'',
					 department:'',
					 office:'',
					 user_type:"1",
					 unit_license:[],
					 unit_prove:[],
					 unit_contact:'',
					 unit_telphone:''
				 },
				 show:false,
				 user_t:999,
				 UserType:0,
      	 companyList:[],
				 company:'0',
				 selectCompany:false
        }
    },
    methods: {//方法

				uploadLicense(res,file,filelist){ 
					let arr=[];
					filelist.forEach(item =>{
						arr.push(item.response.data);
					})
					this.datalist.unit_license=arr;
					console.log(this.datalist.unit_license)
				},
				upremoveLicense(file,filelist){
         let arr=[];
         filelist.forEach(item =>{
         	arr.push(item.response.data);
         })
         this.datalist.unit_license=arr;
				},
				uploadProve(res,file,filelist){
					let arr=[];
					filelist.forEach(item =>{
						arr.push(item.response.data);
					})
					this.datalist.unit_prove=arr;
					// console.log(this.datalist.unit_prove)
				},
				upremoveProve(file,filelist){
					let arr=[];
					filelist.forEach(item =>{
						arr.push(item.response.data);
					})
					this.datalist.unit_prove=arr;
				},
				submit(type){
					let postData = [];
					if(type == 2){  //政府账户首次提交
						postData = this.datalist;
							$ax.getAjaxData('service/User/change_type',Object.assign({}, postData), (res) =>{
							if(res.status == 200){
								sessionStorage.user_type=this.datalist.user_type;	
								this.$router.replace({name: 'home'});
							}else if(res.status==300){
								console.log(res)
							}
						});
					}else if(type ==1){ //普通账户首次
						 postData = {user_type:this.datalist.user_type} ;
	 						$ax.getAjaxData('service/User/change_type',Object.assign({}, postData), (res) =>{
							if(res.status == 200){
								// sessionStorage.user_type=this.datalist.user_type;
								this.show= false;
								this.selectCompany = true;

							}else if(res.status==300){
								console.log(res)
							}
						});
					}
	
				},
				selectSuc(){   //普通账户每次选择公司
					console.log(this.company);					
						$ax.getAjaxData('service/Oauth/select_company',this.company, (res) =>{
						if(res.status == 200){
							sessionStorage.user_type=this.datalist.user_type;
							this.$router.replace({name: 'home'});
						}else if(res.status==300){
							console.log(res)
						}
					});
				}
    },
    computed: {//计算属性
				 GovShow(){
								if(this.datalist.user_type==2){
									return true;
								}else{
									return false;
								}
							},
				companySelect(){
					let arr = [];
					arr.push({value:'0',label:'默认'});
					for(let item of this.companyList){
						let com = {
							value:'',
							label:''
						}
						com.value = item.company_unid;
						com.label = item.name;
						arr.push(com);
					}
					return arr;
				}
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
							
					   let resourceData = await $ax.getAsyncAjaxData('service/Oauth/get_center_info',{}); //判断是否登陆用户中心
						   
							next(vm => {
									if(resourceData.status == 200){ //已登陆用户中心																	 
										 $ax.getAjaxData('service/User/detail',{}, (res) =>{  //获取资料管理用户信息
										 	if(res.status == 200){
												let type=0 //
										 		  if(res.data.user_type ==0){
														vm.show = true;
													}else if(res.data.user_type == 2){ //不是首次进入的政府账户 直接进入
														sessionStorage.user_type = res.data.user_type;
														vm.$router.replace({name: 'home'});
													}else if(res.data.user_type == 1){ //不是首次进入的普通用户 要选公司												    
														$ax.getAjaxData('service/Oauth/getCompanyList',{}, (res) =>{ //获取公司列表
															if(res.status == 200){
																vm.companyList = res.data;
															}
														});
														vm.selectCompany = true;
													}
										 	}else if(res.status==300){
	
										 	}
										 });
									}else if(resourceData.status == 300){  //未登陆用户中心
										let loginUrl="";
										$ax.getAjaxData('service/Oauth/get_jump_addr',{}, (res) =>{
											if(res.status == 200){
												loginUrl=res.data;
												 window.location.href=loginUrl;
											}else if(res.status==300){
												console.log('没有获取到链接');
											}
										});
										
									}
							});
						
					} catch(err) {
						console.log(err);
					}
					
					next();
					
				})();
		
	}
}

</script>

<style scoped lang="less">

</style>