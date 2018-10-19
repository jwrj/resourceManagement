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
								<h1>{{list.person}}</h1>
								<p>所属单位：{{list.name}}</p>
								<p>所属职务：{{list.work}}</p>
								<p>商会实名认证</p>
								</div>
				</div>
				
				<div class="audit" v-if="showAudit">
						<h1>审核选项</h1>
						<br>
					<p>
						<Button type="primary" style="margin-left: 15px;">通过审核</Button>
						<Button style="margin-left: 15px;">未通过审核</Button>
					</p>
				</div>
			</Card>
			
			<Card style="margin-top: 5px;" v-if="showResource">
				<div slot="title">
					<h1>资源状态</h1>
				</div>
				<p>开放承接：正在开放</p>
				<p>审核状态：已通过</p>
				<p>可见区域：会内可见</p>
				<p>时限状态：未结束资源</p>
				<Button type="primary" style="margin: 15px 0 0 15px;">我要承接</Button>
			</Card>
			
			<Card style="margin-top: 5px;">
				<div slot="title">
					<h1>其他承接单位</h1>
				</div>
				
				<div class="unit" v-for="(unit,index) of unitlist" :key="index" @click="rowclick(unit)">
					<p style="font-size: 16px;color: black;" >{{unit.name}}</p>
					<p class="gray">商会：{{unit.cham}}</p>
					<p class="gray">时间：{{unit.start}}</p>
				</div>
			</Card>
		</div>
		
		
	</div>
	
</template>

<script>
import {bus} from '@/components/bus/event-bus.js'
export default {
	name: 'rightCard',
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
		showResource:{
			type:Boolean,
			default:false
		},
		showAudit:{
			type:Boolean,
			default:false
		},
		units:{
			type:Array,
			default:() =>[
					{
						name:'深圳市中投顾问股份有限公司',
						cham:'广西湖北商会',
						date:'2017-01-01'
					},
					{
						name:'南宁市高新顾问股份有限公司',
						cham:'广西湖北商会',
						date:'2017-08-01'
					},
					{
						name:'中山市石头信息科技有限公司',
						cham:'广西湖北商会',
						date:'2017-07-21'
					},
					{
						name:'桂林市大富翁股份有限公司',
						cham:'广西湖北商会',
						date:'2017-11-09'
					},
					{
						name:'北京市豆浆油条有限公司',
						cham:'广西湖北商会',
						date:'2017-12-13'
					}
			]
		},
    list: {
      // 对象或数组默认值必须从一个工厂函数获取
      default:() =>[]
	  }
	},
    data () {//数据
        return {

        }
    },
    methods: {//方法
    	rowclick(unitData){
				console.log(unitData);
			bus.$emit('unitDetail',unitData.name);
			this.$router.push({name:'carryDetail', params: {list:bus.currentResource}});
		}
    },
    computed: {//计算属性
        unitlist(){
					return bus.unitlist;
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
		border-top: 1px solid #C2CCD1;
		margin: 10px 0;
		padding-top: 10px;
	}
</style>
