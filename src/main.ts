import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {RawLocation, Route} from "vue-router";
import {SesssionStorageService} from "@/service/storage";
import './assets/css/style.css' ;
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import Header from './components/header.vue' ;

Vue.config.productionTip = false;
const ignoreUrls = ['/error' , '/reverse'];
router.beforeEach((
	to: Route,
	from: Route,
	next: () => void
): void => {
	const loginInfo = SesssionStorageService.get('loginInfo');

	if (!!~ignoreUrls.indexOf(to.path)) {
		next();
		return ;
	}

	if( loginInfo ) {
		next();
		return ;
	} else {
		router.push({
			path: '/error' ,
			query: {
				code: '403'
			}
		}) ;
	}
});

Vue.component('common-header' , Header) ;
Vue.use( ElementUI );

new Vue({
	router,
	render: h => h(App)
}).$mount('#app') ;
