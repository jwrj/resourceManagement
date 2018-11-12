<template>
	
	<div>
		<div style="flex: 1;">
			<Card>
				<div slot="title">
					<h1>发布人信息</h1>
				</div>
				<div class="centent">
								<Icon type="md-image" size="120" />
								<div class="middle">
								<h1>{{person.center_name}}</h1>
								<p>所属单位：{{person.unit}}</p>
								<p>手机号码：{{person.work_phone}}</p>
								</div>
				</div>
				
				<div class="audit" v-if="showAudit">
						<h1>审核选项</h1>
						<br>
					<p>
						<Button type="primary" style="margin-left: 15px;" @click="audit(1)">通过审核</Button>
						<Button style="margin-left: 15px;" @click="audit(2)">未通过审核</Button>
					</p>
				</div>
			</Card>
			
			<Card style="margin-top: 5px;" v-if="showResource">
				<div slot="title">
					<h1>资源状态</h1>
				</div>
				<p>开放承接：正在开放</p>
				<p>审核状态：<Tag :color="list.status ==1?'blue':'red'">{{list.status == 1?'已通过':'未通过'}}</Tag></p>
				<p>可见区域：{{list.scope_release ==3 ?'政府资源':'会内会间'}}</p>
				<p>承接需求：<Tag color="blue">公司</Tag><Tag color="pink" v-if="list.is_company ==0">个人</Tag></p>
				<p>时限状态：未过期</p>
				
				       
           <Button v-show="showGetButton" type="primary" style="margin: 15px 0;" @click="choice=true">我要承接</Button>
				<Modal
        v-model="choice"
        title="承接资源"
				footer-hide
				:mask-closable="false"
				@on-cancel="cancel"
        >
				<p> 
					<Tag color="volcano">
					{{list.is_company ==0?'tips:请选择一个公司承接，或者不选以个人身份承接资源':'tips:该资源不可个人承接，请选择一个公司'}}
					</Tag>
				</p>
				<p style="margin: 5px 0;"><span class="bold">已选公司：</span><Tag color="magenta">{{company?company:'未选择'}}</Tag></p>
				<Table :columns="tableColumns" :data="tableDa" @on-row-click="choiceCompany" :highlight-row="true"></Table>
				<br>
				<Poptip
        confirm
        :title="company == ''?'未选择公司,是否以个人身份承接该资源？':'是否给该公司承接资源？'"
        @on-ok="getResource">
        <Button type="primary">确定</Button>
    </Poptip>
				<Button @click="cancel" style="margin-left: 8px;">取消</Button>
        </Modal>
				
			</Card>

			<Card style="margin-top: 5px;">
				<div slot="title">
					<h1>其他承接单位</h1>
				</div>
				
				<div class="unit" v-for="(unit,index) of list.user" :key="index" @click="rowclick(unit)" v-if="unit.pivot.company_id">
					<p style="font-size: 16px;color: black;" >{{unit.company_name?unit.company_name:'个人承接'}}</p>
					<p class="gray">创建时间：{{unit.pivot.create_time}}</p>
				</div>
			</Card>
		</div>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue'
export default {
	name: 'rightCard',
	components:{//组件模板
	tableList
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		showResource:{
			type:Boolean,
			default:false
		},
		list:{
			default: () => []
		},
		person:{
			default: () => []
		}
	},
    data () {//数据
        return {
					choice:false,
					company:'',
					tableColumns: [
							{
								title: 'ID',
								key: 'id'
							},
							{
								title: '名称',
								key: 'name'
							}
						],
			chamList:[]
        }
    },
    methods: {//方法
    	rowclick(unitData){  //后台验证用户是超管或者这是用户在查看自己发布的资源的承接者时跳转
			$ax.getAjaxData('service/ResourceUser/detail',{id:unitData.pivot.id}, res => {				
				if(res.status == 200){
						this.$router.push({ path: '/audit/carryDetail', query: { id:unitData.pivot.id}});
				}else if(res.status == 300){
					this.$Message.error({
							content: res.message,
							duration: 7
					});
				}
			});
			
			
		},
		choiceCompany(data,index){//选择公司
				this.company=data.name;
		},
		cancel(){ //取消选择
			this.company='';
			this.choice=false;
		},
		getResource(){ //请求承接资源 判断是否能以个人承接 => 公司是否选择
     if(this.list.is_company == 1){
        if(this.company == ''){
					this.$Message.error({
						    content: '该资源不可个人承接！请选择一个公司！',
                duration: 10
					});
				}else{
					this.carryOut();
				}
		 }else if(this.list.is_company == 0){
			 this.carryOut();
		 }
		},
		carryOut(){  //承接资源的Main方法
			for(let item of this.chamList){
			if(item.name == this.company){
				let add={
					id:this.list.id,
					company_id:item.company_id
				}
				$ax.getAjaxData('service/ResourceUser/add',Object.assign({}, add), res => {
					
					if(res.status == 200){
						this.$Message.info('成功');
						this.choice=false;
					}else if(res.status == 300){
						this.$Message.error({
							  content: res.message,
                duration: 7
						});
					}
				});
			}
			}
		},
		audit(auditFlag){
			this.$emit('adminAudit',auditFlag);
		}
    },
    computed: {//计算属性
					tableDa(){
						let arr=this.chamList;
						for(let i=0;i<arr.length;i++){
							this.$set(arr[i],"id",i);
						}
						return arr;
					},
					showGetButton(){
						var userJsonStr = sessionStorage.user_type;

						let arr=[];
						arr.push(userJsonStr);
						if(arr[0] == '1'){
							return true;
						}
					},
					showAudit(){
						if(sessionStorage.user_type ==3){
							if(this.list.status ==1){
								return false
							}else if(this.list.status ==0){
								return true
								}
						}else{
							return false
						}
					}


    },
    watch: {//监测数据变化

	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
			
	},

    mounted () {//模板被渲染完毕之后执行
    	$ax.getAjaxData('service/Oauth/get_center_info',{}, res => {
    		
    		if(res.status == 200){
    			this.chamList=res.data.company;
    		}
    	});
			
			
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
	.gray{
		font-size: 12px;
	}
	.unit{
		border-bottom: 1px solid #C2CCD1;
		padding: 8px 2px;
	}
	.audit{
		// border-top: 1px solid #C2CCD1;
		margin: 10px 0;
		padding-top: 10px;
	}
</style>
