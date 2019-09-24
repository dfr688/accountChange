import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import My from '@/components/my/My'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import Bill from '@/components/my/Bill'
import Note from '@/components/note/Note'
import Income from '@/components/note/Income'
import Expend from '@/components/note/Expend'
import Calendars from '@/components/home/Calendars'
import Forget from '@/components/login/Forget'
import Privacy from '@/components/login/Privacy'
// import Redirect from '@/components/home/Redirect'
import { Toast } from 'mint-ui';


Vue.use(Router)

 const router = new Router({
   routes: [
	 // {
	 // 	path: '/redirect',
	 // 	component: Redirect
	 // },
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
		 	requiresAuth: true
		}
	},
	{
		path: '/my',
		name: 'my',
		component: My,
		meta: {
		 	requiresAuth: true
		}
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/bill',
		component: Bill
	},
	{
		path: '/note',
		redirect: '/note/expend',
		meta: {
		 	requiresAuth: true
		}
	},
	{
		path: '/note',
		component: Note,
		children: [
			{
				path: 'income',
				name: 'income',
				component: Income
			},
			{
				path: 'expend',
				name: 'expend',
				component: Expend
			}
		]
	},
	{
		path: '/calendars',
		component: Calendars
	},
	{
		path: '/forget',
		component: Forget
	},
	{
		path: '/privacy',
		component: Privacy
	},
	{
	    path: '*',
	    redirect: "/home"
	}
   ]
 });

 //  路由权限控制 进入my组件时候 需要登录状态
     	router.beforeEach((to,from,next) => {
  		// console.log(to.meta.requiresAuth)
  		if(to.meta.requiresAuth){
  			// 如果不为空 说明已经登录 直接放行
 			// console.log(localStorage.getItem("token"));
  			if(localStorage.getItem("token")!= null){
  				next();
  			}else{
 				Toast({
						message: '请先登录！',
						duration: 1000
					});
  				next({path: "/login"});
  			}
  		}else{
  			next();
  		}
     	});

 export default router;
