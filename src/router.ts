import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);
const router =  new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
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
