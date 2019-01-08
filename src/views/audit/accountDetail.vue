<template>
	
	<div>
		<Card>
			<h1 slot="title">政府账户审核</h1>
			<div  style="margin: 15px;">
						<div class="centent">
							<Icon type="md-contact" size="160" />
							
							<div class="middle">
								<h1 v-if="person">{{person.truest_name}}</h1>
														
								<Row type="flex" justify="start" align="top" >
									<Col span="8">
										<div style="display: flex;">
											<div>			
												<p>注册时间</p>
												<p>身份证号</p>
											</div>
											<div>
												<p v-if="person">：{{person.addtime | formatDate}}</p>
												<p v-if="person">：{{card?card:'--'}}</p>
											</div>
										</div>
									</Col>
									
									<Col span="8">				
									<div style="display: flex;">
										<div>
											<p>联系电话</p>
											<p>手机号码</p>
										</div>
										<div>
											<p v-if="person">：{{person.work_phone}}</p>
											<p v-if="person">：{{person.touch_phone}}</p>
										</div>
									</div>
									</Col>
								</Row>
								
							</div><hr>
						</div>
			</div>
			
			<div class="content">
				<h1>单位信息</h1>
				<Divider />
					<div style="padding: 15px 30px;display: flex;justify-content: space-between;">
					<div class="left">
								<p class="between"><span style="padding-left: 28px;">职务：</span>{{datalist.office}}</p>
								<p class="between">单位名称：{{datalist.unit}}</p>
								<p class="between">所属部门：{{datalist.department}}</p>
								<div class="content-body between">
									<div style="flex: 0 0 auto;">单位执照：</div>
									<div style="padding: 15px 15px 0 0;" 
									v-for="(url,index) of licenseList">
										<img :src="`${host}${url}`" style="width: 100px;margin-right:15px;border: 1px solid #515A6E;">										
									</div>
								</div>
								
								<div class="content-body between">
									<div style="flex: 0 0 auto;">单位证明：</div>
									<div style="padding: 15px 15px 0 0;" 
									v-for="(url,index) of proveList">
										<img :src="`${host}${url}`" style="width: 100px;margin-right:15px;border: 1px solid #515A6E;">
										
									</div>
						
								</div>
					</div>
						
						<div class="right">
							<p>身份证：</p>
							<img src="../../assets/img/default-img/u969.jpg" alt="" style="width: 200px;">
						</div>
						
					</div>
	
			</div>							
			
			<div style="margin-top: 15px;padding: 15px 30px;">
				<h1>审核选项</h1>
				<Divider />

						<p class="between">审核意见：<Tag :color="datalist.status == 0?'red':'blue'">{{datalist.status == 0?'未通过':'已通过'}}</Tag>
						<Poptip
							confirm
							title="确定通过审核？"
							placement="right-end"
							@on-ok="auditOk"
							@on-cancel="auditCancel">
							<Button size="small" type="primary" v-if="datalist.status == 0">点击通过审核</Button>
						</Poptip>
						</p>
						
						<p class="between">审核单位：广西南宁市某机关单位</p>
						
										
<!-- 						<p class="between">颁发验证：<Tag :color="Verification?'blue':'red'">{{verText}}</Tag>
						<Poptip
							confirm
							title="确定通过认证？"
							placement="right-end"
							@on-ok="verOk"
							@on-cancel="verCancel">
							<Button size="small" type="primary" v-if="!Verification">点击通过实名认证</Button>
						</Poptip>
						</p> -->
			</div>
			
		</Card>
		
	</div>
	
</template>

<script>
import {formatDate} from '../../../public/js/date.js'
export default {
	name: 'accountDetail',
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
			person: {},
			audit:false,
			auditText:'未通过',
			Verification:false,
			verText:'未实名',
        	datalist:[],
			licenseL:"",
			proveL:"",
			host:'http://192.168.2.251:8083/',
			
			}
			
    },
    methods: {//方法
    	auditCancel(){

			
			 
			
		},
		auditOk(){		
			    let postData ={
					status:1,
					user_id:this.datalist.id
				}
				$ax.getAjaxData('service/User/preview',Object.assign({}, postData), (res) =>{
				if(res.status == 200){	
					this.$Message.info('审核成功');
					this.$router.go(-1);
				}else if(res.status==300){
					console.log(res)
				}
				});
		},
		verOk(){
			this.Verification=true;
			this.verText='已实名';
			this.$Message.info('You click ok');
		},
		verCancel(){
			this.$Message.info('You click cancel');
		}
    },
    computed: {//计算属性
        licenseList(){
			let arr = [];
			let license =this.licenseL;
			if(license.indexOf(',') == -1){
				arr.push(license) 
			}else{
				arr = license.split(',');
			}
			return arr;
		},
		proveList(){
			let arr = [];
			let prove =this.proveL;
			if(prove.indexOf(',') == -1){
				arr.push(prove) 
			}else{
				arr = prove.split(',');
			}
			return arr;
		},
		card(){
				return this.person.card_num;
		}
    },
    watch: {//监测数据变化

	},
    filters: {
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
						let user_id = '';
						if( to.query.id){
							user_id =  to.query.id;
							sessionStorage.cur_auditAc = user_id;
						}else {
							if(sessionStorage.cur_auditAc){
								user_id = sessionStorage.cur_auditAc;
							}
						}
						let resourceData = await $ax.getAsyncAjaxData('service/User/detail',{user_id:user_id});						
							next(vm => {
									if(resourceData.status == 200){
										vm.datalist=resourceData.data;
										vm.person = resourceData.data.person;
										vm.licenseL = resourceData.data.unit_license;
										vm.proveL = resourceData.data.unit_prove;
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
	}
	.middle{
		flex: 3;
	}
	.content-body{
        display: flex;
	}
	.between{
		margin: 5px 0;
	}

</style>
