<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
			 <Card style="width: 400px;margin: auto;">
				 <h1 slot="title">修改用户信息</h1>
				 			<!-- <Button @click="login">登陆</Button> -->									
 
				 			<Form  :model="datalist" >
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
													:show-upload-list="false"
													:format="['jpg','jpeg','png']"
													:on-format-error="handleFormatError"
				 									action="http://192.168.2.251:8083/index.php/service/Uploadfile/simple_itf">
				 										<Button icon="ios-cloud-upload-outline">选择图片</Button>
				 									</Upload>
           <div class="api">
           							<span style="width: 60px;height: 70px;" 
           							v-for="(ig,index) of licenselist" v-if="ig">
           
           										<div @mouseover="show('license',index)" @mouseout="hide('license',index)"
           										:style="{backgroundImage: 'url('+ host + ig + ')', backgroundSize:'cover',height:'79px',width:'59px',border:'2px solid white'}">
           												
																			<div v-if="index == Lshow" class="Showfile">
																			<Icon type="ios-search" @click="look(ig)" color= "white" size="25"/>
																			<Icon type="ios-trash" @click="remove('license',ig)"  color= "white" size="25" />
																			</div>
															</div>
           							</span>
           												 
           </div>
									 

				 				</FormItem>
				 				<FormItem label="单位证明:">
				 								<Upload
				 								:multiple="true"
				 								name="image"
				 								:on-success="uploadProve"
												:show-upload-list="false"
												:format="['jpg','jpeg','png']"
												:on-format-error="handleFormatError"
				 								action="http://192.168.2.251:8083/index.php/service/Uploadfile/simple_itf">
				 									<Button icon="ios-cloud-upload-outline">选择图片</Button>
				 								</Upload>

													<div class="api"  >
												<span style="width: 60px;height: 70px;" 
												v-for="(ig,index) of provelist" v-if="ig" >

												<div @mouseover="show('prove',index)" @mouseout="hide('prove',index)"
												:style="{backgroundImage: 'url('+ host + ig + ')', backgroundSize:'cover',height:'79px',width:'59px',border:'2px solid white'}">
												
												<div v-if="index == Pshow" class="Showfile">
												<Icon type="ios-search" @click="look(ig)" color= "white" size="25"/>
												<Icon type="ios-trash" @click="remove('prove',ig)"  color= "white" size="25" />
												</div>
												
												</div>
												</span>
												 
														</div>

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
							<router-link to="/home"><Button type="primary" ghost style="margin-left: 5px;">返回主页</Button></router-link>
						</p>
			 </Card>
          <Modal
        v-model="lookImg"
        title="查看图片"
				footer-hide
				>
        <img :src="lookImage" >
    </Modal>
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import postCasc from '@/components/post/post-casc.vue';//岗位级联

export default {
	name: 'edit',
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
         datalist:{
					 unit:'',
					 department:'',
					 office:'',
					 unit_license:[],
					 unit_prove:[],
					 unit_contact:'',
					 unit_telphone:'',
					 delete_files:""
				 },
				 beforelist:{},
				 provelist:[],
				 lookImg:false,
				 lookImage:"",
				 host:'http://192.168.2.251:8083/',
				 Pshow:99999,
				 Lshow:99999,
				 beforeLicense:{},
				 licenselist:[],
				 delLic:[],
				 delPro:[]
      	       	
        }
    },
    methods: {//方法

				uploadLicense(res,file,filelist){ 
						this.licenselist.push(res.data);
						
				},
				uploadProve(res,file,filelist){
					this.provelist.push(res.data)
					
				},
				submit(){
						let del = this.delPro.concat(this.delLic);
						let str = del.join()
						this.datalist.unit_license = this.licenselist.join()
						this.datalist.unit_prove = this.provelist.join()
						this.datalist.delete_files = str;
						let postData = {
							unit:this.datalist.unit,
							department:this.datalist.department,
							office:this.datalist.office,
							unit_license:this.datalist.unit_license,
							unit_prove:this.datalist.unit_prove,
							unit_contact:this.datalist.unit_contact,
							unit_telphone:this.datalist.unit_telphone,
							delete_files:this.datalist.delete_files
							
						}
						$ax.getAjaxData('service/User/edit',postData, (res) =>{
							if(res.status == 200){
								 this.$router.replace({name: 'home'});
							}else if(res.status==300){
								console.log(res)
							}
						});		 
				},
				look(imgurl){
					this.lookImg = true;
					let url ="http://192.168.2.251:8083/";
					this.lookImage = url+imgurl;
				},
				show(kind,index){			
					if(kind == 'prove'){
						this.Pshow = index;
					}else if(kind == 'license'){
						this.Lshow = index;
					}
				},
				hide(kind,index){
					if(kind == 'prove'){
						this.Pshow = 99999;
					}else if(kind == 'license'){
						this.Lshow = 99999;
					}
				},
				remove (kind,imgUrl) {
					this.$Modal.confirm({
															title: '删除图片',
															content: '<p>确定删除该图片吗？</p>',
															onOk: () => {
																if(kind == 'prove'){
																	this.provelist.splice(this.provelist.indexOf(imgUrl), 1,'');
																	this.delPro.push(imgUrl);
																}else if(kind == 'license'){
																	this.licenselist.splice(this.licenselist.indexOf(imgUrl), 1);																		
																	this.delLic.push(imgUrl);

																	
																}
																	this.$Message.info('Clicked ok');
															},
															onCancel: () => {
																	this.$Message.info('Clicked cancel');
															}
													});
        },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '该文件格式不可上传',
                    desc:  file.name + ' 不是图片, 请选择jpg、png或者jpeg格式！'
                });
            },
    },
    computed: {//计算属性
    },
    watch: {//监测数据变化
			beforelist(){
				let list=[];
				var arr = this.beforelist.split(",");
				  for(let i of arr){
						 list.push(i)
					}
					this.provelist = list;
			},
			beforeLicense(){
				let list =[];
				var arr = this.beforeLicense.split(",");
					for(let i of arr){
						list.push(i)
					}
					this.licenselist = list;
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
					   let resourceData = await $ax.getAsyncAjaxData('service/User/detail',{});
						   
							next(vm => {
									if(resourceData.status == 200){
										 vm.datalist=resourceData.data;
										 vm.beforelist=resourceData.data.unit_prove;//2
										 vm.beforeLicense = resourceData.data.unit_license;//1
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
.api{
	display:flex;
	flex-direction: row;
	flex-wrap: wrap; 
	padding:15px;
	justify-content: flex-start;
	align-items: center;
}
.Showfile{
	z-index: 20;
	display: flex;
	flex-direction:column;
	padding-top: 5px;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,0.2);
	height: 100%;
}
</style>