<template>

	<div>
		<Card>
			<div slot="title">
				<h1>发布资源-政府资源</h1>
			</div>
			<div class="news">
				<span> <strong>发布人信息</strong></span>
				<span>用户名：{{person.truest_name}}</span>
				<span>单位：{{userdata.unit}}</span>
			</div>
			<br>
			
		<Form :model="resList" 
		:rules="ruleValidate" 
		label-position="right"
		:label-width="100"
		ref="link" 
		style="margin-top: 5px;">
					<FormItem label="标题" prop="title">
						<Input v-model="resList.title" type="text" style="width: 200px;">
						</Input>
					</FormItem>
					
			<FormItem label="发布范围">
		
				<Button type="primary" @click="showImport=true">请选择商会</Button>
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
				<p><Button @click="resetResult" v-if="result.length !== 0" type="primary">清空</Button></p>
			</FormItem>
				<Row>
					<Col :lg="12" :md="16" :sm="24" :xs="24">
					<FormItem label="起始时间" prop="time">
						<DatePicker 
						v-model="resList.time" 
						type="daterange" 
						split-panels placeholder="选择时间" 
						@on-change="formatTime"
						style="width: 200px">
						</DatePicker>
					</FormItem>
					
					<FormItem label="预计收益" prop="profit">
						<Input v-model="resList.profit" type="text" style="width: 200px;">
						<span slot="append">元</span>
						</Input>
					</FormItem>
					<FormItem label="收益年限" prop="profit_limit">
						<Input v-model="resList.profit_limit" type="text" style="width: 200px;">
						<span slot="append">年</span>
						</Input>
					</FormItem>
					</Col>
					<Col :lg="12" :md="16" :sm="24" :xs="24">
					<FormItem label="投资金额" prop="invest_money">
						<Input v-model="resList.invest_money" type="text" style="width: 200px;">
						<span slot="append">元</span>
						</Input>
					</FormItem>
					<FormItem label="资质需求">
						<Input v-model="resList.qualification" type="text" style="width: 200px;">
						</Input>
					</FormItem>

					</Col>
				</Row>
									<FormItem
                v-for="(person, index) in resList.personList"
                v-if="person.status"
                :key="index"
                :label="'联系人 ' + person.index">
            <Row>
						<Col span="18">
							<Input type="text" v-model="person.title" style="width: 200px;" placeholder="请输入姓名"></Input>——
							<Input type="text" v-model="person.contact" style="width: 200px;" placeholder="请输入手机号码"></Input>
						</Col>
						<Col span="4" offset="1">
							<Button @click="handleRemove(index)">Delete</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Row>
						<Col span="10">
							<Button type="dashed"  @click="handleAdd" icon="md-add">新增联系人</Button>
						</Col>
					</Row>
				</FormItem>
			</Form>
		</Card>
		<Card style="margin-top: 16px;">
			<h1 slot="title">项目介绍</h1>
		<UEditor :configs='editor_config' @up_editor_content="upEditorContent"></UEditor>
		</Card>
		<Card style="margin-top: 16px;height: 600px;">
		
					<h1 slot="title">附件上传</h1>
						<file @uploadFile="uploadFile"></file>
		<p style="margin-top: 15px;text-align: center;width: 100%;">
			<Button type="primary" @click="handleSubmit('link')">立即创建</Button>
		</p>
				</Card>
		<Modal v-model="showImport" 
		:mask-closable="false" 
		title="请选择商会"
		@on-ok="getData" :width="800">
<!-- 			<table-list 
			:tableColumns="tableColumns" 
			ref="selectCham" 
			:tableData="tableDa" 
			:modalTitle="modalTitle"
			>

				<div slot="header">
					<al-cascader v-model="res_s" placeholder="选择地区" style="width: 300px;" />
				</div>
			</table-list> -->
			<xw-table :tableColumns="tableColumns" 
			ref="selectCham" 
			:tableData="tableDa" >
			<div slot="header">
				<al-cascader v-model="res_s" placeholder="选择地区" style="width: 300px;" />
			</div>
			</xw-table>
		</Modal>
	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'
	import UEditor from '@/components/richTextEditor/UEditor.vue';//富文本编辑器
	import file from '@/views/manage/detail/file.vue' //附件
	export default {
		name: '',
		components: { //组件模板,
			tableList,
			UEditor,
			file
		},
		props: { //组件道具（参数）
			/* ****属性用法*****
			 * 
			 * 传递类型 type: Array | Number | String | Object
			 * 为必传 required: true
			 * 默认值 default: ''
			 * 
			 */
		},
		data() { //数据
			return {
				editor_config:{
						width:'100%',
						height:'500px'
				},
				userdata:[],
				person:{},
				res_s: [],
				modalTitle:'',
				showImport: false,
				result: [],
				chamList:[],
				uploadCloud:[],
				cloud:[],
				resList: {
					title:'',
					replease:'3',
					time: [],
					remark:'',
					invest_money:'',
					profit:'',
					profit_limit:'',
					qualification:'',
					index: 1,
					personList: [
                        {
                            title: '',
														contact:'',
                            index: 1,
                            status: 1
                        }
                    ]
				},
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
				],
				ruleValidate: {
					time: [{
						type: 'array',
						required: true
					}],
					profit: [{
						required: true,
						message: '请填写预计收益',
						trigger: 'blur'
					}],
					profit_limit: [{
						required: true,
						message: '请填写收益年限',
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: '标题不能为空',
						trigger: 'blur'
					}],
					invest_money: [{
						required: true,
						message: '请填写投资金额',
						trigger: 'blur'
					}]
				}
			}
		},

		methods: { //方法
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
			
			},
			resetResult() {//清空
				this.result = [];
				this.$refs.selectCham.checkedData=[];
			},
			
			handleSubmit(name) {//提交
        if(this.resList.remark==''){
        	this.$Message.error({
        			content: '项目简介不能为空',
        			duration: 7
        	});
        	return;
        }
				var add={		
							title:this.resList.title,
							scope_release:this.resList.replease,
							start_time:this.resList.time[0],
							end_time:this.resList.time[1],
							invest_money:this.resList.invest_money,
							profit:this.resList.profit,
							qualification:this.resList.qualification,
							profit_limit:this.resList.profit_limit,
							attach:[],
							remark:this.resList.remark,
							scope_select:this.selected,
							contacts:this.contactList
							}
							for(let i =0;i<this.uploadCloud.length;i++){
								let str =this.uploadCloud[i].attch_id;
								this.uploadCloud[i].attch_id = str.join();
							}
							add.attach = JSON.stringify(this.uploadCloud);
							console.log(add.attach);
				this.$refs[name].validate((valid) => {
					if (valid) {
						$ax.getAjaxData('service/Resource/government', Object.assign({}, add), res => {
							
							if(res.status == 200){
								this.$Message.success('添加成功!');
								this.resList=[];
							}else if(res.status ==300){
								this.$Modal.confirm({
									title: '错误',
									content: res.message
								});
							}
						});
					} else {             
					}
				})
			},
			    handleAdd () {
                this.resList.index++;
				console.log( this.resList.personList)
                this.resList.personList.push({
                    title: '',
					contact:'',
                    index:  this.resList.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.resList.personList[index].status = 0;
            },
			btnClick(val){
				this.modalTitle=val.params.row.name;
				console.log(val);
			},
			formatTime(date){
				this.resList.time = date;
			//	console.log(this.resList.time)
			},
			closeTag(res,index){
				//关闭标签触发
				for(let i=0;i<this.result.length;i++){
					if(this.result[i].name==res.name){
						this.result.splice(i,1)
					}
				}
			},
			upEditorContent(value){//获取富文本的数据
				this.resList.remark = value;
			},
			uploadFile(list){ //附件上传监听事件 如果id没有 就加入
			//判断要上传的附件所在这个文件夹是否存在数组里
					if(this.uploadCloud == 0){
						console.log('first')
								let obj = {
														folder_id : list.folder_id,
														attch_id : []
													}
													obj.attch_id.push(list.id);
													this.uploadCloud.push(obj);
						
					}else{
							let flag =false;
							let index = -1;
							for(let i of this.uploadCloud){
								if(i.folder_id ==list.folder_id)	{
									flag =true;
									index =this.uploadCloud.indexOf(i);
								}
							}
							if(flag == true){
								this.uploadCloud[index].attch_id.push(list.id);
							}else {
																let obj = {
																						folder_id : list.folder_id,
																						attch_id : []
																					}
																					obj.attch_id.push(list.id);
																					this.uploadCloud.push(obj);
							}
				
					}

			}
			
		},
		computed: { //计算属性
			tableDa(){
				let arr=this.chamList;
				for(let i=0;i<arr.length;i++){
					this.$set(arr[i],"id",i);
				}
				return arr;
			},
			selected(){
				let arr=[]
				for(let i of this.result){
					if(i.name){
						arr.push(i.name);
					}
				}
				arr=arr.join();
				console.log(arr);
				return arr;
			},
			contactList(){
				let arr=[];
				// return this.resList.personList.slice(0,1);
				for (let i=0;i<this.resList.personList.length;i++ ){
				let resl={
					"title":'',
					"contact":''
				};
				resl.title = this.resList.personList[i].title
				resl.contact = this.resList.personList[i].contact
				arr.push(resl)
					
					
				}
				return JSON.stringify(arr);
			}
		},
		watch: { //监测数据变化,

		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行

		},
		mounted() { //模板被渲染完毕之后执行
          $ax.getAjaxData('service/Oauth/allOrgList',{}, res => {
          	
          	if(res.status == 200){
          		this.chamList=res.data;
          	}
          });
		  
		},

		//=================组件路由勾子==============================

		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

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
										vm.userdata=resourceData.data;
										vm.person = resourceData.data.person;
									}else if(resourceData.status == 300){
							    vm.userdata=[];
										console.log('???')
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
	.news span {
		padding: 5px 5px 5px 0;
	}
	.news{
		margin-left: 30px;
	}
</style>
