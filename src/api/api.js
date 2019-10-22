import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import router from '../router/index'

axios.defaults.timeout = 1500000
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

export const headersA = { "content-type": 'multipart/form-data'};


//请求拦截器
axios.interceptors.request.use(config => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	return config
}, 
error => {

	console.log('错误的传参！')
})

axios.interceptors.request.use(config => {
	if (config.method === 'put') {
		config.data = qs.stringify(config.data)
	}
	return config
}, 
error => {

	console.log('错误的传参！')
})

//响应拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if(error.response.status==401){
			var that=this;
			MessageBox.alert('请重新登录', '登录超时', {
				confirmButtonText: '确定',
				closeOnPressEscape:false,
				showClose:false,
				callback: action => {
					if(action=='confirm'){
						router.push('/login');
					}
				}
			});
		}else{
			Message({
				message: error.response.data.msg,
				type: 'error'
			});
		}
		return Promise.reject(error)
	})


let hosturl ='https://ru.fengniaotuangou.cn'

let base = hosturl

export default hosturl

//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

export const requestLogout = params => { return axios.get(`${base}/logout`+`${params}`).then(res => res.data)}



//轮播
export const advertsGet = params => { return axios.get(`${base}/banners`+`${params}`).then(res => res.data)}
export const advertPost = params => { return axios.post(`${base}/banner`, params).then(res => res.data)}
export const advertDel = params => { return axios.get(`${base}/del/banner`+`${params}`).then(res => res.data)}





//分类
export const typeGet = params => { return axios.get(`${base}/types`+`${params}`).then(res => res.data)}

export const typePost = params => { return axios.post(`${base}/type`, params).then(res => res.data)}

export const typeDel = params => { return axios.get(`${base}/del/type`+`${params}`).then(res => res.data)}


//用户
export const userGet = params => { return axios.get(`${base}/wechat/users`+`${params}`).then(res => res.data)}

export const userPost = params => { return axios.post(`${base}/wechat/user`, params).then(res => res.data)}


//拼团
export const groupPost = params => { return axios.post(`${base}/group/buy`, params).then(res => res.data)}

export const groupGet = params => { return axios.get(`${base}/group/buy`+`${params}`).then(res => res.data)}

export const groupsGet = params => { return axios.get(`${base}/group/buys`+`${params}`).then(res => res.data)}

export const groupDel = params => { return axios.get(`${base}/del/group/buy`+`${params}`).then(res => res.data)}

export const groupSet = params => { return axios.get(`${base}/check/group/buy`+`${params}`).then(res => res.data)}



//订单
export const allorderGet = params => { return axios.get(`${base}/orders`+`${params}`).then(res => res.data)}

export const allorderTui = params => { return axios.get(`${base}/refund/order`+`${params}`).then(res => res.data)}

export const shipgoods = params => { return axios.post(`${base}/delivery/order`, params).then(res => res.data)}

export const tablePost = params => { return axios.post(`${base}/import/orders`, params,{headers:headersA}).then(res => res.data)}




//代理申请
export const applyGet = params => { return axios.get(`${base}/proxy/applies`+`${params}`).then(res => res.data)}

export const applyCheck = params => { return axios.post(`${base}/proxy/apply`,params).then(res => res.data)}















// 设置
export const baseset = params => { return axios.post(`${base}/config`, params).then(res => res.data)}

export const baseget = params => { return axios.get(`${base}/config`+`${params}`).then(res => res.data)}





export const keywordGet = params => { return axios.get(`${base}/keywords`+`${params}`).then(res => res.data)}

export const keywordPost = params => { return axios.post(`${base}/keyword`, params).then(res => res.data)}

export const keywordDel = params => { return axios.get(`${base}/del/keyword`+`${params}`).then(res => res.data)}



//帮助文档
export const documentsGet = params => { return axios.get(`${base}/documents`+`${params}`).then(res => res.data)}

// export const documentGet = params => { return axios.get(`${base}/document`+`${params}`).then(res => res.data)}

export const documentPost = params => { return axios.post(`${base}/document`, params).then(res => res.data)}

// export const documentDel = params => { return axios.get(`${base}/del/document`+`${params}`).then(res => res.data)}






//快递
export const deliveryGet = params => { return axios.get(`${base}/expresses`+`${params}`).then(res => res.data)}

export const deliveryPost = params => { return axios.post(`${base}/express`, params).then(res => res.data)}

export const deliveryDel = params => { return axios.delete(`${base}/express`+`${params}`).then(res => res.data)}




// //快递配置
// export const kdconfigGet = params => { return axios.get(`${base}/express/config`+`${params}`).then(res => res.data)}

// export const kdconfigPost = params => { return axios.post(`${base}/express/config`, params).then(res => res.data)}












//统计数据
export const countdataGet = params => { return axios.get(`${base}/count`+`${params}`).then(res => res.data)}




//店铺地区
export const shopaddGet = params => { return axios.get(`${base}/cities`+`${params}`).then(res => res.data)}

export const shopaddPost = params => { return axios.post(`${base}/city`, params).then(res => res.data)}

export const shopaddDel = params => { return axios.delete(`${base}/city`+`${params}`).then(res => res.data)}



//店铺
export const shopPost = params => { return axios.post(`${base}/store`, params).then(res => res.data)}

export const shopGet = params => { return axios.get(`${base}/stores`+`${params}`).then(res => res.data)}

export const shoponeGet = params => { return axios.get(`${base}/store`+`${params}`).then(res => res.data)}

export const storeCheck = params => { return axios.get(`${base}/check/store`+`${params}`).then(res => res.data)}

export const storeDel = params => { return axios.delete(`${base}/store`+`${params}`).then(res => res.data)}


export const bindshop = params => { return axios.get(`${base}/bind/store`+`${params}`).then(res => res.data)}

export const tixianPost = params => { return axios.post(`${base}/withdraw`, params).then(res => res.data)}



export const bindcheck = params => { return axios.get(`${base}/bind/user`+`${params}`).then(res => res.data)}
export const unbindcheck = params => { return axios.get(`${base}/unbind/user`+`${params}`).then(res => res.data)}
export const bindchecks = params => { return axios.get(`${base}/store/binds`+`${params}`).then(res => res.data)}













//分销
export const agentGet = params => { return axios.get(`${base}/proxies`+`${params}`).then(res => res.data)}

export const proxyGet = params => { return axios.get(`${base}/amount/details`+`${params}`).then(res => res.data)}

export const ratioPost = params => { return axios.post(`${base}/ratio`, params).then(res => res.data)}

export const ratioGet = params => { return axios.get(`${base}/ratio`+`${params}`).then(res => res.data)}

export const comGetAll = params => { return axios.get(`${base}/brokerages`+`${params}`).then(res => res.data)}





//管理员
export const adminGet = params => { return axios.get(`${base}/admins`+`${params}`).then(res => res.data)}

export const adminPost = params => { return axios.post(`${base}/admin`, params).then(res => res.data)}

export const adminDel = params => { return axios.delete(`${base}/user`+`${params}`).then(res => res.data)}






//角色
export const permissionGet = params => { return axios.get(`${base}/permissions`+`${params}`).then(res => res.data)}

export const roleGet = params => { return axios.get(`${base}/roles`+`${params}`).then(res => res.data)}

export const rolePost = params => { return axios.post(`${base}/role`, params).then(res => res.data)}

export const roleDel = params => { return axios.delete(`${base}/role`+`${params}`).then(res => res.data)}

export const defaultrole = params => { return axios.get(`${base}/default/role`+`${params}`).then(res => res.data)}

//微信设置
// export const wxconfigPost = params => { return axios.post(`${base}/tx/config`, params).then(res => res.data)}

// export const wxconfigGet = params => { return axios.get(`${base}/tx/config`+`${params}`).then(res => res.data)}

export const wxconfigPost = params => { return axios.post(`${base}/notify/config`, params).then(res => res.data)}

export const wxconfigGet = params => { return axios.get(`${base}/notify/configs`+`${params}`).then(res => res.data)}

export const wxconfigDel = params => { return axios.get(`${base}/del/notify/configs`+`${params}`).then(res => res.data)}



//海报
export const posterPost = params => { return axios.post(`${base}/poster/configs`, params).then(res => res.data)}

export const posterGet = params => { return axios.get(`${base}/poster/configs`+`${params}`).then(res => res.data)}






export const tuisongPost = params => { return axios.post(`${base}/notify/queue`, params).then(res => res.data)}
