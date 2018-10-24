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
	    redirect: '/login',
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
		path: '/resource',
		name: 'resource',
		meta: {
			title: '查看资源',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'resourceIn',
				name: 'resourceIn',
				meta: {
					title: '会内资源',
					icon: 'md-alarm',
				},
				component: () => import('@/views/resource/resourceIn.vue')
			},
			{
				path: 'resourceCen',
				name: 'resourceCen',
				meta: {
					title: '会间资源',
					icon: 'md-alarm',
				},
				component: () => import('@/views/resource/resourceCen.vue')
		  },
			{
			path: 'resourceGov',
			name: 'resourceGov',
			meta: {
				title: '政府资源',
				icon: 'md-alarm',
			},
			component: () => import('@/views/resource/resourceGov.vue')	
			}
		]
	},

	{
		path: '/manage',
		name: 'manage',
		meta: {
			title: '资源管理',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'chamberRes',
				name: 'chamberRes',
				meta: {
					title: '商会资源发布',
					icon: 'md-alarm',
				},
				component: () => import('@/views/manage/chamberRes.vue')
			},
			{
				path: 'govRes',
				name: 'govRes',
				meta: {
					title: '政府资源发布',
					icon: 'md-alarm',
				},
				component: () => import('@/views/manage/govRes.vue')
			},
			{
				path: 'myPost',
				name: 'myPost',
				meta: {
					title: '我发布的资源',
					icon: 'md-alarm',
				},
				component: () => import('@/views/manage/myPost.vue')
			},
			{
				path: 'myGet',
				name: 'myGet',
				meta: {
					title: '我承接的资源',
					icon: 'md-alarm',
				},
				component: () => import('@/views/manage/myGet.vue')
		  }
		]
	},
	{
		path: '/audit',
		name: 'audit',
		meta: {
			title: '审核',
			icon: 'md-alarm',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'auditResource',
				name: 'auditResource',
				meta: {
					title: '资源审核',
					icon: 'md-alarm',
				},
				component: () => import('@/views/audit/auditResource.vue')
			},
			{
				path: 'auditAccount',
				name: 'auditAccount',
				meta: {
					title: '账户审核',
					icon: 'md-alarm',
				},
				component: () => import('@/views/audit/auditAccount.vue')
			},
			{
				path: 'chamDetail',
				name: 'chamDetail',
				meta: {
					title: '会间资源审核详情',
					icon: 'md-alarm',
				},
				component: () => import('@/views/audit/chamDetail.vue')
			},
			{
				path: 'govDetail',
				name: 'govDetail',
				meta: {
					title: '政府资源详情',
					icon: 'md-alarm',
				},
				component: () => import('@/views/audit/govDetail.vue')
			},
			{
				path: 'accountDetail',
				name: 'accountDetail',
				meta: {
					title: '账户审核详情',
					icon: 'md-alarm',
				},
				component: () => import('@/views/audit/accountDetail.vue')
			},
			{
				path: 'carryDetail',
				name: 'carryDetail',
				meta: {
					title: '资源承接单位详情页',
					icon: 'md-alarm',
				},
				component: () => import('@/views/audit/carryDetail.vue')
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