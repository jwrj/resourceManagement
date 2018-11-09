<template>
	
	<div>
		<Card>
			<h1 slot="title">资源审核</h1>

				<Button type="primary" @click="showImport=true">
					请选择商会
				</Button>
				<p style="margin-top: 5px;">
					已选商会:
					<Tag 
					color="primary"
					type="border"
					closable
					:name="res.id"
					v-for="(res,index) in result" 
					:key="index"
					@on-close="closeTag(res,index)"
					>{{res.name}}
					</Tag>
				</p>
				<p>
					<Button @click="resetResult" 
					v-if="result.length !== 0" 
					type="primary">清空
					</Button>
				</p>
	

			<img-text :datalist="datalist" @search="searchList"
			 @openDetail="openDetail" :hideRadio="true" >
			</img-text>
			<Page :total="100" show-total
			 @on-change="pageChange"
			 style="margin-top: 10px;margin-left: 30px;"/>
		</Card>
		<Modal 
		v-model="showImport" 
		:mask-closable="false" 
		title="请选择商会"
		@on-ok="getData" 
		:width="800">
			<xw-table
			:tableColumns="tableColumns" 
			ref="selectCham" 
			:chamber="result"
			:tableData="tableDa"
			>
			</xw-table>
		</Modal>
		
	</div>
	
</template>

<script>
import imgText from '@/views/resource/component/imgText.vue'
import {bus} from '@/components/bus/event-bus.js'
export default {
	name: '',
	components:{//组件模板,
	imgText
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
        	datalist:[],
					routeName:'chamDetail',
					searchlist:[],
					result:[],
					showImport: false,
					tableColumns: [{
							type: 'selection'
						},
						{
							title: 'ID',
							key: 'id'
						},
						{
							title: '名称',
							key: 'name'
						}
					]
        }
    },
    methods: {//方法
    	searchList(list) {
				// this.$set(this.searchlist,"scope_release",this.range);
				let objList=[];
				// let arr=list.check;
				// let servlet='';
				this.$set(objList,"title",list.word);
				// this.$set(objList,"status",arr.join());			
				this.$set(objList,"start_time",list.time[0]);
				this.$set(objList,"end_time",list.time[1]);
				// this.$set(objList,"scope_release",);
				this.searchlist =Object.assign({},objList);
				$ax.getAjaxData('service/Resource/preview_index',this.searchlist, (res) =>{
					if(res.status == 200){
						this.datalist=res.data;
					}else if(res.status==300){
						this.datalist=[];
					}
				});
    	},
		openDetail(data){   //政府不需要审核直接发布
				this.$router.push({ path: '/audit/chamDetail', query: { id:data.id}});

			
		},
		pageChange(page){
			console.log('页码是'+page)  //传页码给后端 获取每页要得到的数据
		},
		closeTag(res,index){
			//关闭标签触发
			for(let i=0;i<this.result.length;i++){
				if(this.result[i].name==res.name){
					this.result.splice(i,1)
					
				}
			}
		},
		resetResult() {//清空
			this.result = [];
			this.$refs.selectCham.checkedData=[];
		},
		getData() {//获取选中的数据并去重 去重待改进
			let sk = this.$refs.selectCham.checkedData;
		// this.result = this.result.concat(sk);			
			let res = sk;
		for(let i = 0; i < this.result.length; i++){
				let item = this.result[i];
				var repeat = false;
				for (let j = 0; j < res.length; j++) {
						if (item.id == res[j].id) {
								repeat = true;
								break;
						}
				}
				if (!repeat) {
						res.push(item);
				}
		}
		this.result=res;
		this.$refs.selectCham.tableData.forEach(item => { //去掉默认选中
		this.$set(item, '_checked', false);
		});
		
		}
		
    },
    computed: {//计算属性
        	selected(){
        		let arr=[]
        		for(let i of this.result){
        			if(i.name){
        				arr.push(i.org_unid);
        			}
        		}
        		arr=arr.join();
        		return arr;
        	},
        	tableDa(){
        			let arr =[];
        			for(let i in this.tableData){
        					let obj ={
        						id:'',
        						name:'',
        						org_unid:''
        					}
        					obj.id = i;
        					obj.name = this.tableData[i].name;
        					obj.org_unid = this.tableData[i].org_unid;
        					arr.push(obj)
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
		$ax.getAjaxData('service/Oauth/allOrgList',{}, res => {				
			if(res.status == 200){
				this.tableData = res.data;
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
			   let resourceData = await $ax.getAsyncAjaxData('service/Resource/preview_index',{});
				   
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

</style>
