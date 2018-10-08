<template>
	
	<div ref="cha">
<Form :model="socieData" :label-width="100" ref="children" :rules="ruleValidate">
        <FormItem label="协会名称:" prop="name">
            <Input v-model="socieData.name" placeholder="请输入协会名称" class="linkIn"></Input>
        </FormItem>
		<FormItem label="上级协会">
			<Input v-model="socieData.highcham" type="text" class="linkIn"></Input>
		</FormItem>
		<FormItem label="注册地" prop="register">
	<al-cascader v-model="socieData.register" style="max-width: 300px;" />
		</FormItem>
		<FormItem label="行业" prop="trade">
<industry-casc v-model="socieData.trade" style="margin-right: 10px;max-width: 300px;"></industry-casc>
		</FormItem>
		<FormItem label="成立时间" prop="time">
       <DatePicker type="date" placeholder="Select date" style="max-width: 200px" v-model="socieData.time"></DatePicker>
		</FormItem>
		<FormItem label="协会标志">
			<Icon type="md-image" @click="openCoc" size="60"/>
		</FormItem>
</Form>
	</div>
	
</template>

<script>
import defaultImg from '@/assets/img/default-img/u710.png'
import industryCasc from '@/components/industry/industry-casc.vue';
export default {
	name: 'society',
	components:{//组件模板,
	industryCasc
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
			societyName:'',
        socieData:{
				trade:[],
				name:'',
				register:[],
				time:'',
				highcham:''
			},
			img:defaultImg,
			ruleValidate: {
					trade: [{
						type: 'array',
						min:1,
						required: true,
						message: '请选择行业',
						trigger: 'change'
					}],
					register: [{
						type: 'array',
						min: 2,
						required: true,
						message: '请选择城市',
						trigger: 'change'
					}],
				name: [{
					required: true,
					message: '请填写协会名称',
					trigger: 'blur'
				}]
				}
        }
    },
    methods: {//方法
    	openCoc(){
			alert('waiting to open coc')
		}
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	}
	
}
</script>

<style scoped lang="less">
		span {
			margin: 0 5px;
		}

		.selector {
			padding-top: 5px;

			.select {
				width: 100px;
			}
		}
		.space{
			margin-top: 5px;
			display: flex;
			align-items: center;
		}
		.tt {
			text-align: left;
			width: 100px;
			display: inline-block;
		}
		.signImg {
			vertical-align:top;
		}
		.linkIn{
			width: 300px;
		}
</style>
