import Main from '@/views/main/main.vue';
import secondaryView from '@/components/secondary-view.vue';

/**
 * meta属性:
 * 
 * @param {Boolean : false} hideMenu 设置不在左侧菜单显示的路由
 * @param {Array} access 设置路由权限[1,2,3...] 或 ['admin','user'...]
 * @param {Boolean : false} showAlways 设置路由永远显示为二级菜单
 * @param {Boolean : false} hideBreadcrumb 设置不显示在面包屑导航中
 * @param {String : '定向到xxx路由的name'} highlightName 点击该路由后在菜单中高亮重定向
 * 
 */

export default [
	{
	    path: '/login',
	    name: 'login',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/login/login.vue')
	},
	{
		path: '/',
		name: '_home',
	    redirect: '/home',
	    meta: {//里面的参数用来做各种显示效果的判断（关键字段）
	    	hideMenu: true,
	    },
	    component: Main,
	    children: [
		    {
		    	path: 'home',
		    	name: 'home',
	            meta: {
	            	title: '首页',
	            	hideMenu: true,
	            	icon: 'ios-paper',
			    },
	            component: () => import('@/views/home.vue')
		    }
		]
	},
	{
		path: '/user',
		name: 'user',
		meta: {
			title: '会员管理',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'joinChamber',
				name: 'joinChamber',
				meta: {
					title: '申请加入商会',
					icon: 'md-alarm',
				},
				component: () => import('@/views/user/joinChamber.vue')
			},
			{
				path: 'userList',
				name: 'userList',
				meta: {
					title: '会员列表',
					icon: 'md-alarm',
				},
				component: () => import('@/views/user/userList.vue')
			}
		]
	},
	{
		path: '/chamber',
		name: 'chamber',
		meta: {
			title: '商会管理',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'createChamber',
				name: 'createChamber',
				meta: {
					title: '创建商会',
					icon: 'md-alarm',
				},
				component: () => import('@/views/chamber/createChamber.vue')
			},
			{
				path: 'postSet',
				name: 'postSet',
				meta: {
					title: '岗位配置',
					icon: 'md-alarm',
				},
				component: () => import('@/views/chamber/postSet.vue')
			},
			{
				path: 'staffSet',
				name: 'staffSet',
				meta: {
					title: '人员配置',
					icon: 'md-alarm',
				},
				component: () => import('@/views/chamber/staffSet.vue')
		  },
			{
				path: 'sessionSet',
				name: 'sessionSet',
				meta: {
					title: '届次配置',
					icon: 'md-alarm',
				},
				component: () => import('@/views/chamber/sessionSet.vue')
			},
			{
				path: 'approve',
				name: 'approve',
				meta: {
					title: '会员审批',
					icon: 'md-alarm',
				},
				component: () => import('@/views/chamber/approve.vue')
			}
		]
	},
	{
		path: '/activity',
		name: 'activity',
		meta: {
			title: '活动/会议管理',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'activityList',
				name: 'activityList',
				meta: {
					title: '活动/会议列表',
					icon: 'md-alarm',
				},
				component: () => import('@/views/activity/activityList.vue')
			},
			{
				path: 'createActivity',
				name: 'createActivity',
				meta: {
					title: '创建活动/会议',
					icon: 'md-alarm',
				},
				component: () => import('@/views/activity/createActivity.vue')
			},
			{
				path: 'activityDetails',
				name: 'activityDetails',
				meta: {
					title: '活动/会议详情',
					icon: 'md-alarm',
				},
				component: () => import('@/views/activity/activityDetails.vue')
			}

		]
	},
	{
		path: '/price',
		name: 'price',
		meta: {
			title: '会费管理',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'dues',
				name: 'dues',
				meta: {
					title: '会费情况',
					icon: 'md-alarm',
				},
				component: () => import('@/views/price/dues.vue')
			}
		]
	},
	{
		path: '/testPages',
		name: 'testPages',
		meta: {
			icon: 'md-alarm',
			hideBreadcrumb: true
		},
		component: Main,
		children: [
			{
				path: 'comPage',
				name: 'comPage',
				meta: {
					title: '组件',
					icon: 'md-alarm',
				},
				component: () => import('@/views/testPages/comPage.vue')
			},
		]
	},
	{
	    path: '/401',
	    name: 'error-401',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/error-page/401.vue')
	},
	{
	    path: '/403',
	    name: 'error-403',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/error-page/401.vue')
	},
	{
	    path: '*',
	    name: 'error-404',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/error-page/404.vue')
	}
]