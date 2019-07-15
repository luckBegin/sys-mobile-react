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
		  component: () => import(/* webpackChunkName: "about" */ './views//error/error.vue')
		},{
			path: '/preLogin',
			name: 'preLogin',
			component: () => import(/* webpackChunkName: "about" */ './views//preLogin/preLogin.vue')
		}
	]
})
