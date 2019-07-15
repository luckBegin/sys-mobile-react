import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);
const router =  new Router({
	mode: 'history',
	base: '/mobile',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/reserve',
			name: 'reserve',
			component: () => import(/* webpackChunkName: "about" */ './views/reserve.vue'),
		},
	],
});
export default router ;
