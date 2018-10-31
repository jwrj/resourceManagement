/*
 * 全局变量
 */
window._HOST = {//主机域名
	
	BASE_URL: 'http://192.168.2.251:8083/index.php/',//基础请求地址
	
}


//     
// 	var userJsonStr = sessionStorage.getItem('user');
// 	let userEntity = JSON.parse(userJsonStr);
// 	let arr=[];
// 	arr.push(userEntity.user_type);

								let arr=[];
								arr.push(parseInt(sessionStorage.user_type))
								window.USE_RACCESS = arr;//用户权限	
