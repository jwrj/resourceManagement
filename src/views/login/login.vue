<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
			 <Card style="width: 400px;margin: auto;" v-if="show">
				 <h1 slot="title">欢迎您！{{userlist.name}}</h1>
				 			<!-- <Button @click="login">登陆</Button> -->									
							<span style="font-size: 12px;" class="bold">请选择用户类型：</span>
							<RadioGroup v-model="datalist.user_type">
											<Radio label="1">普通用户</Radio>
											<Radio label="2">政府用户</Radio>
										</RadioGroup>
				 			<Form  :model="datalist" v-if="GovShow">
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
							<Button type="primary" @click="submit" style="margin: 10px 0;">确定提交</Button>
						</p>
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
					userlist:{},
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
				 show:false
      	       	
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
				submit(){

						$ax.getAjaxData('service/User/edit',Object.assign({}, this.datalist), (res) =>{
							if(res.status == 200){
								console.log('成功')
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
					   let resourceData = await $ax.getAsyncAjaxData('service/Oauth/get_center_info',{});
						   
							next(vm => {
									if(resourceData.status == 200){
										 vm.userlist=resourceData.data.user;										
										$ax.getAjaxData('service/User/is_perfect',{}, (res) =>{
											if(res.status == 200){
												$ax.getAjaxData('service/User/detail',{}, (res) =>{
													if(res.status == 200){
														let user={
															user_type:res.data.user_type
														}
														sessionStorage.setItem('user', JSON.stringify(user));
													}
												});
												vm.$router.replace({name: 'home'});
											}else if(res.status==300){
												vm.show=true;
											}
										});
									}else if(resourceData.status == 300){
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
		
	},
	
}
</script>

<style scoped lang="less">

</style>