import fetch from 'isomorphic-fetch';

/**
 * @param {Promise} fetch_promise    fetch请求返回的Promise
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

let common_url = 'http://mobile.vision-world.cn:8080'; //正式服务器地址
let token = '';

let api = function(params) {

	let header = {
		"Content-Type": "application/json;charset=UTF-8",
		// "accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
	};

	// console.log('request url:',params);  //打印请求参数
	//Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。
	return new Promise(function(resolve, reject) {
		// 请求
		fetch(params.url, {
				method: params.method,
				headers: header,
				body: JSON.stringify(params.params)
			})
			.then((response) => response.json())
			.then((responseData) => {
				//console.log('res:', responseData);  //网络请求成功返回的数据
				resolve(responseData);
			})
			.catch((error) => {
				//console.log('err:', error);   //网络请求失败返回的数据
				console.log("服务器错误");
				reject(error);
			})

	})
};

export default api;