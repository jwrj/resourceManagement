<template>
	
	<div>
		<Card>
			<h1 slot="title">政府账户审核</h1>
			<div  style="margin: 15px;">
					<div class="centent">
						<Icon type="md-image" size="180" />
						
						<div class="middle">
							<h1>{{datalist.name}}</h1>
													
							<Row type="flex" justify="start" align="top" >
								<Col span="8">
									<div style="display: flex;">
										<div>			
											<p>注册时间</p>
											<p>身份证号</p>
										</div>
										<div>
											<p>：2017-10-18</p>
											<p>：{{datalist.card ? datalist.card :'--'}}</p>
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
										<p>：110110</p>
										<p>：18877798898</p>
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
					<div style="padding: 15px 30px;">
						<p class="between"><span style="padding-left: 28px;">职务：</span>{{datalist.job}}</p>
						<p class="between">单位名称：{{datalist.unit}}</p>
						<p class="between">单位地区：{{datalist.addr}}</p>
						<div class="content-body between">
							<div style="flex: 0 0 auto;">单位执照：</div>
							<div style="padding: 15px 15px 0 0;" 
							v-for="(url,index) of datalist.unitLicense"
							v-if="index<3">
								<img :src="url" style="width: 100px;margin-right:15px;">
								<img :src="url" style="width: 100px;margin-right:15px;">
								<img :src="url" style="width: 100px;margin-right:15px;">
								<img :src="url" style="width: 100px;margin-right:15px;">
								<img :src="url" style="width: 100px;margin-right:15px;">
							</div>
						</div>
						
						<div class="content-body between">
							<div style="flex: 0 0 auto;">单位证明：</div>
							<div style="padding: 15px 15px 0 0;" 
							v-for="(url,index) of datalist.unitLicense"
							v-if="index<3">
								<img :src="url" style="width: 100px;margin-right:15px;">
								<img :src="url" style="width: 100px;margin-right:15px;">
							</div>
				
						</div>
						
					</div>
	
			</div>							
			
			<div style="margin-top: 15px;padding: 15px 30px;">
				<h1>审核选项</h1>
				<Divider />
				<p class="between">审核意见：<Tag :color="audit?'blue':'red'">{{auditText}}</Tag>
				<Poptip
					confirm
					title="确定通过审核？"
					placement="right-end"
					@on-ok="auditOk"
					@on-cancel="auditCancel">
					<Button size="small" type="primary" v-if="!audit">点击通过审核</Button>
				</Poptip>
				</p>
				
				<p class="between">审核单位：广西南宁市某机关单位</p>
				
				<p class="between">审核时间：2018-01-15</p>
								
				<p class="between">颁发验证：<Tag :color="Verification?'blue':'red'">{{verText}}</Tag>
				<Poptip
					confirm
					title="确定通过认证？"
					placement="right-end"
					@on-ok="verOk"
					@on-cancel="verCancel">
					<Button size="small" type="primary" v-if="!Verification">点击通过实名认证</Button>
				</Poptip>
				</p>
			</div>
			
		</Card>
		
		<Card style="margin-top: 16px;height: 600px;">
			
			<h1 slot="title">文件管理</h1>
			<file-manage currentRouteName="comPage"></file-manage>	
		</Card>
	</div>
	
</template>

<script>
import fileManage from '@/components/fileManage/file-manage.vue';//文件管理
export default {
	name: 'accountDetail',
	components:{//组件模板
	fileManage
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
			audit:false,
			auditText:'未通过',
			Verification:false,
			verText:'未实名',
        	datalist:[],
			imgUrl:'http://yuanxing.bzttech.com/cocsys/coc_resourceSystem/images/%E5%8F%91%E5%B8%83%E8%B5%84%E6%BA%90-%E4%BC%9A%E5%86%85%E4%BC%9A%E9%97%B4/u708.png'
        }
    },
    methods: {//方法
    	auditCancel(){
			 this.$Message.info('You click cancel');
		},
		auditOk(){		
				this.audit=true;
				this.auditText='已通过';
				this.$Message.info('You click ok');
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
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.datalist=this.$route.params.datalist;
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
