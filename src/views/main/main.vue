<style scoped lang="less">
	.layout {
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
		height: 100vh;
	}
	.layout-header-bar {
		padding: 0 !important;
		height: auto !important;
		line-height: initial !important;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}
	.main-content-box{
		width: 100%;
		height: 100%;
		padding: 30px 16px 300px;
		box-sizing: border-box;
		overflow: auto;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

<template>

	<div class="layout">

		<Layout>
			
			<!--左侧菜单-->
			<Sider ref="siderInstance" hide-trigger collapsible :collapsed-width="64" v-model="isCollapsed" style="height: 100vh;z-index: 1000;">
				<p style="font-size: 28px;text-align: center;margin: 15px 0;color: white;">资源管理系统</p>
				<!--<div style="height:50px;line-height:50px;color: #fff;padding: 0 5px;text-align: center;font-size: 24px;overflow: hidden;background: #19be6b;margin: 10px;">资源管理</div>-->
				<menu-sider ref='sideMenu' :menuList="menuList" :isCollapsed="isCollapsed"></menu-sider>
			</Sider>
			
			<!--右侧-->
			<Layout style="overflow: hidden;">
				
				<!--头部-->
				<Header class="layout-header-bar">
					<div style="height: 100%;">
						<!--面包屑导航-->
						<breadcrumb-module :breadCrumbList="breadCrumbList" :isCollapsed="isCollapsed" @clickIcon="collapsedSider" @exit="exit"></breadcrumb-module>
						<!--tag标签导航-->
						<tag-module :tagList="tagNavList"></tag-module>
					</div>
				</Header>
				
				<!--内容-->
				<Content style="position: relative;">
					<div class="main-content-box">
						<router-view/>
					</div>
				</Content>
				
			</Layout>
			
		</Layout>

	</div>

</template>

<script>
	
import menuSider from './menu/menu-sider.vue'

import breadcrumbModule from './header/breadcrumb-module.vue';

import tagModule from './header/tag-module.vue';

import { getNewTagList } from '@/toolBox';

import { mapMutations } from 'vuex';

export default {
	name: 'Main',
	components: { //组件模板
		menuSider,
		breadcrumbModule,
		tagModule,
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
			
			isCollapsed: false,
			
		}
	},
	methods: { //方法
		
		...mapMutations([
			'setBreadCrumb',
	      	'setTagNavList',
	      	'addTag',
	      	'getMenuList'
		]),
		
		collapsedSider() {//展开或收起左侧菜单
			this.$refs.siderInstance.toggleCollapse();
		},
		exit(){
			sessionStorage.removeItem('type')
			sessionStorage.removeItem('user_type')
			this.$router.push('/mainLogin')
		}
	},
	computed: { //计算属性
		
		menuList(){//菜单列表
			return this.$store.state.app.menuList;
			//return this.$store.getters.menuList;
		},
		
		breadCrumbList(){//面包屑列表
	    	return this.$store.state.app.breadCrumbList;
	    },
	    
		tagNavList(){//tag列表
	    	return this.$store.state.app.tagNavList;
	    },
		
	},
	watch: { //监测数据变化
		
		'$route'(newRoute){
			
			this.setBreadCrumb(newRoute.matched);
			
        	this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
			
		},
		
		isCollapsed(newIo){
			this.$store.state.app.isCollapsed = newIo;
		},
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
		this.getMenuList();//获取菜单列表
		
		/**
	     * @description 初始化设置面包屑导航和标签导航
	     */
	    this.setTagNavList();
	    
	    this.addTag({route: this.$store.state.app.homeRoute});
	    
	    this.setBreadCrumb(this.$route.matched);
		
	},
	mounted() { //模板被渲染完毕之后执行
		
	},

}
</script>