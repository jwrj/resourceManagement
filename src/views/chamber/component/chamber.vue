<template>

	<div class="chamber" ref="cha">
		<Form :model="chamData" :label-width="100" ref="children" :rules="ruleValidate">
			<FormItem label="商会名称" prop="name">
				<Input v-model="chamData.name" placeholder="请输入商会名称" class="linkIn"></Input>
			</FormItem>
			<FormItem label="上级商会">
				<Input v-model="chamData.highcham" type="text" class="linkIn"></Input>
			</FormItem>
			<FormItem label="注册地" prop="register" >
				<al-cascader v-model="chamData.register" style="max-width: 300px;"/>
			</FormItem>
			<FormItem prop="core" label="归属地">
				<al-cascader v-model="chamData.core" style="max-width: 300px;" />
			</FormItem>
			<FormItem label="商会标志">
				<Icon type="md-image" @click="openCoc" size="60"/>
			</FormItem>
		</Form>
	</div>

</template>

<script>
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import defaultImg from '@/assets/img/default-img/u710.png'
	export default {
		name: 'chamber',
		components: { //组件模板,
			postCasc
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
				chamberName: '',
				img:defaultImg,
				chamData: {
					highcham: '',
					register: [],
					name: '',
					core: []
				},
				ruleValidate: {
					core: [{
						type: 'array',
						min: 2,
						required: true,
						message: '请选择城市',
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
						message: '请填写商会名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: { //方法
			openCoc() {
				alert('waiting to open coc')
			}
		},
		computed: { //计算属性

		},
		watch: { //监测数据变化

		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行

		},
		mounted() { //模板被渲染完毕之后执行

		}

	}
</script>

<style scoped lang="less">
	.chamber {

		span {
			margin: 0 5px;
		}

		.selector {
			padding-top: 5px;

			.select {
				width: 100px;
			}
		}

		.space {
			margin-top: 5px;
			display: flex;
			align-items: center;
		}

		.tt {
			text-align: left;
			width: 100px;
			display: inline-block;
		}

		.linkIn {
			width: 300px;
		}
	}
</style>
