<template>
	
	<div>
		
		<Cascader v-model="cascaderValue" filterable placeholder="选择岗位" :data="data"></Cascader>
		
	</div>
	
</template>

<script>

export default {
	name: 'postCasc',
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
        	
        	cascaderValue: [],
        	
        	data: [
        		{
        			label: '会员大会',
        			value: '1',
        			children: [
        				{
        					label: '名誉会长',
        					value: '2',
        				},
        				{
        					label: '理事大会',
        					value: '3',
        					children: [
        						{
        							label: '秘书长',
        							value: '4',
        						},
        						{
        							label: '监事委员会',
        							value: '5',
        						},
        						{
        							label: '常委执委会',
        							value: '6',
        						},
        						{
        							label: '理事长',
        							value: '7',
        						},
        					]
        				},
        				{
        					label: '总顾问',
        					value: '8',
        				},
        			]
        		}
        	],
        	
        }
    },
    methods: {//方法
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
		
}
</script>

<style scoped lang="less">

</style>