// import Vue from 'vue'
// import Router from 'vue-router'
// import routers from './router.js'; //调用路由表
// import { pathImperfect, canTurnTo } from '@/toolBox'; //调用工具
// 
// Vue.use(Router)
// 
// export const router = new Router({
// 	routes: routers
// });
// 
// router.beforeEach((to, from, next) => {//路由跳转前
// 	
// 	// 检测系统内部登录
// 	if(!sessionStorage.type &&!to.name == 'mainLogin'){//用户中心未登录
// 		
// 		next({
// 			name: 'mainLogin'
// 		});
//     
// 	}else{
// 		
// 
// 		//检测页面权限
// 		if(canTurnTo(routers, window.USE_RACCESS, to.name)){
// 			
// 			if(pathImperfect(routers, to.name)){
// 				next({
// 					replace: true,
// 					name: 'error-401'
// 				});
// 			}else{
// 				next()
// 			}
// 			
// 		}else{
// 			
// 			next({
// 				replace: true,
// 				name: 'error-403'
// 			});
// 			
// 		}
// 		
// 	}
// 	
// });
// 
import Vue from 'vue'
import Router from 'vue-router'
import routers from './router.js'; //调用路由表
import { pathImperfect, canTurnTo } from '@/toolBox'; //调用工具



Vue.use(Router)

export const router = new Router({
	routes: routers
});

router.beforeEach((to, from, next) => {//路由跳转前
if(to.meta.auth == false){
		// 检测系统内部登录
		if(!sessionStorage.user_type &&to.name !== 'mainLogin'){//用户中心未登录
			console.log('没登陆')
			next({
				name: 'mainLogin'
			});
	
		}else {
		//检测页面权限 [2]
		let userAccess = sessionStorage.user_type;
		if(canTurnTo(routers, (userAccess ? [Number(userAccess)] : false), to.name)){
			
			if(pathImperfect(routers, to.name)){
				next({
					replace: true,
					name: 'error-401'
				});
			}else{
				next()
			}
			
		}else{
			next({
				replace: true,
				name: 'error-403'
			});
			
		}
			
			
		}
	
	
}else {
	next()
}
	
});
