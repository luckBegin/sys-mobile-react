import Vue from 'vue'
import Router from 'vue-router' ;

Vue.use(Router);
export default new Router({
	mode: 'history',
	base: '/mobile',
	routes: [
		{
		  path: '/error',
		  name: 'error',
		  component: () => import(/* webpackChunkName: "about" */ './views/error/error.vue')
		},{
			path: '/reserve',
			name: 'reserve.vue',
			component: () => import(/* webpackChunkName: "about" */ './views/reserve/reserve.vue')
		},{
			path: '/preLogin',
			name: 'preLogin',
			component: () => import(/* webpackChunkName: "about" */ './views/preLogin/preLogin.vue')
		},{
			path: '/home',
			name: 'home',
			component: () => import(/* webpackChunkName: "about" */ './views/home/home.vue')
		}
	]
})
