import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import { MessageBox } from 'element-ui';

import Console from '@/components/index/Console'

import Goodlist from '@/components/Good/Goodlist'
import Goodtype from '@/components/Good/Goodtype'
import Goodnew from '@/components/Good/Goodnew'



// import Shoplist from '@/components/Shop/Shoplist'
// import Shopadd from '@/components/Shop/Shopadd'
// import Newshop from '@/components/Shop/Newshop'
import Joinlist from '@/components/Agent/Joinlist'

import Orderlist from '@/components/Order/Orderlist'

import Userlist from '@/components/User/Userlist'

import Proxylist from '@/components/Agent/Proxylist'
// import Commission from '@/components/Agent/Commission'

// import Adminlist from '@/components/Role/Adminlist'

import Sendmsg from '@/components/Message/Sendmsg'

import Baseset from '@/components/Setting/Baseset'
import Wordset from '@/components/Setting/Wordset'
import Wechatset from '@/components/Setting/Wechatset'
import Document from '@/components/Setting/Document'
import Delivelist from '@/components/Setting/Delivelist'

import Banner from '@/components/Banner/Banner'

const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
  mode: 'history', 
  routes: [{
    path: '/Login',
    name: '登录',
    component: Login
},


{
    leaf: true,
    path: '/',
    name: '拼团管理',
    component: Home,
    redirect: '/Good/Goodlist',
    menuShow: true,
    iconCls: 'iconfont menu-good',
    children: [

    {path: '/Good/Goodlist',component: Goodlist,name: '拼团列表',menuShow: true,meta:{permission: ''}},
    {path: '/Good/Goodnew',component: Goodnew,name: '添加拼团',menuShow: false,meta:{permission: ''}},
    ]
},
{
    leaf: true,
    path: '/',
    name: '拼团分类',
    component: Home,
    redirect: '/Good/Goodtype',
    menuShow: true,
    iconCls: 'iconfont menu-good',
    children: [
    {path: '/Good/Goodtype',component: Goodtype,name: '拼团分类',menuShow: true,meta:{permission: ''}},
    ]
},

{
    leaf: true,
    path: '/',
    name: '轮播',
    component: Home,
    redirect: '/Banner/Banner',
    menuShow: true,
    iconCls: 'iconfont menu-guanggao',
    children: [
    {path: '/Banner/Banner',component: Banner,name: '轮播',menuShow: true,meta:{permission: ''}}
    ]
},


{
    leaf: true,
    path: '/',
    name: '订单管理',
    component: Home,
    redirect: '/Order/Orderlist',
    menuShow: true,
    iconCls: 'iconfont menu-dingdan',
    children: [
    {path: '/Order/Orderlist',component: Orderlist,name: '订单记录',menuShow: true,meta:{permission: ''}}, 
    ]
}, 
{
    leaf: true,
    path: '/',
    name: '用户',
    component: Home,
    redirect: '/User/Userlist',
    menuShow: true,
    iconCls: 'iconfont menu-yonghu',
    children: [
    {path: '/User/Userlist',component: Userlist,name: '用户列表',menuShow: true,meta:{permission: ''}},
    ]
}, 


{
    leaf: true,
    path: '/',
    name: '分销管理',
    component: Home,
    redirect: '/Agent/Proxylist',
    menuShow: true,
    iconCls: 'iconfont menu-kongzhi',
    children: [
    {path: '/Agent/Proxylist',component: Proxylist,name: '代理列表',menuShow: true,meta:{permission: ''}}, 
    ]
},

{
    leaf: true,
    path: '/',
    name: '分销申请',
    component: Home,
    redirect: '/Agent/Joinlist',
    menuShow: true,
    iconCls: 'iconfont menu-kongzhi',
    children: [
    {path: '/Agent/Joinlist',component: Joinlist,name: '分销申请',menuShow: true,meta:{permission: ''}}, 
    ]
},

{    
    // leaf: true,
    path: '/',
    name: '系统',
    component: Home,
    redirect: '/Setting/Baseset',
    menuShow: true,
    iconCls: 'iconfont menu-xitong',
    children: [
    {path: '/Setting/Baseset',component: Baseset,name: '系统设置',menuShow: true,meta:{permission: ''}},
    {path: '/Setting/Wordset',component: Wordset,name: '搜索设置',menuShow: true,meta:{permission: ''}},
    {path: '/Setting/Wechatset',component: Wechatset,name: '微信设置',menuShow: true,meta:{permission: ''}},
    {path: '/Setting/Document',component: Document,name: '帮助文档',menuShow: true,meta:{permission: ''}},
    {path: '/Setting/Delivelist',component: Delivelist,name: '快递设置',menuShow: true,meta:{permission: ''}},
    ]
}, 


{
  leaf: true,
  path: '/',
  name: '推送',
  component: Home,
  redirect: '/Message/Sendmsg',
  menuShow: true,
  iconCls: 'iconfont menu-guanggao',
  children: [
  {path: '/Message/Sendmsg',component: Sendmsg,name: '模板消息',menuShow: true,meta:{permission: ''}},
  ]
}, 
































 //  {
 //   leaf: true,
 //   path: '/',
 //   name: '商家',
 //   component: Home,
 //   redirect: '/Shop/Shoplist',
 //   menuShow: true,
 //   iconCls: 'iconfont menu-shangjia',
 //   children: [
 //   {path: '/Shop/Shoplist',component: Shoplist,name: '商家列表',menuShow: true,meta:{permission: ''}}, 
 //   {path: '/Shop/Newshop',component: Newshop,name: '新增店铺',menuShow: false,meta:{permission: ''}}, 
 //   ]
 // },
//  {
//    leaf: true,
//    path: '/',
//    name: '商家管理',
//    component: Home,
//    redirect: '/Shop/Shoplist',
//    menuShow: true,
//    iconCls: 'iconfont menu-shangjia',
//    children: [
//    {path: '/Shop/Shopadd',component: Shopadd,name: '商店地区',menuShow: true,meta:{permission: ''}},
//    ]
//  },   

//  {
//   leaf: true,
//   path: '/',
//   name: '订单管理',
//   component: Home,
//   redirect: '/Order/Orderlist',
//   menuShow: true,
//   iconCls: 'iconfont menu-dingdan',
//   children: [
//   {path: '/Order/Orderlist',component: Orderlist,name: '充值记录',menuShow: true,meta:{permission: ''}}, 
//   ]
// }, 
// {
//   leaf: true,
//   path: '/',
//   name: '用户',
//   component: Home,
//   redirect: '/User/Userlist',
//   menuShow: true,
//   iconCls: 'iconfont menu-yonghu',
//   children: [
//   {path: '/User/Userlist',component: Userlist,name: '用户列表',menuShow: true,meta:{permission: ''}},
//   ]
// }, 
// {
//   leaf: true,
//   path: '/',
//   name: '分销管理',
//   component: Home,
//   redirect: '/Agent/Joinlist',
//   menuShow: true,
//   iconCls: 'iconfont menu-kongzhi',
//   children: [
//   {path: '/Agent/Joinlist',component: Joinlist,name: '分销申请',menuShow: true,meta:{permission: ''}}, 
//   ]
// },
// {        
//   leaf: true,
//   path: '/',
//   name: '代理',
//   component: Home,
//   redirect: '/Agent/Proxyapply',
//   menuShow: true,
//   iconCls: 'iconfont menu-agent',
//   children: [
//   {path: '/Agent/Proxylist',component: Proxylist,name: '代理管理',menuShow: true,meta:{permission: ''}}, 
//   ]
// }, 
// {
//   leaf: true,
//   path: '/',
//   name: '轮播',
//   component: Home,
//   redirect: '/Baseset/Baseset',
//   menuShow: true,
//   iconCls: 'iconfont menu-guanggao',
//   children: [
//   {path: '/Baseset/Banner',component: Banner,name: '轮播图',menuShow: true,meta:{permission: ''}}
//   ]
// },
// {
//   path: '/',
//   name: '系统',
//   component: Home,
//   redirect: '/Setting/Baseset',
//   menuShow: true,
//   iconCls: 'iconfont menu-xitong',
//   children: [
//   {path: '/Setting/Baseset',component: Baseset,name: '系统设置',menuShow: true,meta:{permission: ''}},
//   {path: '/Setting/Wechatset',component: Wechatset,name: '微信设置',menuShow: true,meta:{permission: ''}},
//   ]
// }, 



// {
//   leaf: true,
//   path: '/',
//   name: '权限管理',
//   component: Home,
//   redirect: '/Role/Adminlist',
//   menuShow: true,
//   iconCls: 'iconfont menu-quanxian',
//   children: [
//   {path: '/Role/Adminlist',component: Adminlist,name: '管理员',menuShow: true,meta:{permission: ''}}
//   ]
// }, 
]
})


router.beforeEach((to, from, next) => {
    // next()
    if (to.path.startsWith('/Login')) {
      next()
  } else {
      let token = window.sessionStorage.getItem('token')
        // console.log(!token)
        if(!token){
          next({path: '/Login'})
      }else{
          next()
      }
 //        if (to.meta.permission && permissions) {
 //            if (permissions.indexOf(to.meta.permission)>-1) {
 //              next()
 //          } else {
 //           MessageBox.alert('没有访问权限', '提示', {
 //            confirmButtonText: '确定',
 //            closeOnPressEscape:false,
 //            showClose:false,
 //            callback: action => {

 //            }
 //        });
 //       }
 //   }else{
 //     next() 
 // }
}
})

export default router