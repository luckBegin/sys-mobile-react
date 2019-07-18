import Vue from 'vue' ;
import App from './App.vue'
import router from './router'
import {RawLocation, Route} from "vue-router";
import {SesssionStorageService} from "@/service/storage";
import './assets/css/style.css' ;
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import Header from './components/header.vue' ;
import SliderPage from './components/slider-page.vue' ;

import {UserService} from "@/service/user/user.service";
import {DateUtils} from "@/utils/date.utils";

Vue.config.productionTip = false;
const ignoreUrls = ['/error' , '/preLogin'];
router.beforeEach((
	to: Route,
	from: Route,
	next: () => void
): void => {
	if (!!~ignoreUrls.indexOf(to.path)) {
		next();
		return ;
	}
	
	const loginInfo = SesssionStorageService.get('userInfo');
	
	if( !loginInfo ) {
		router.push({
			path: '/error' ,
			query: {
				code: '401'
			}
		}) ;
		return ;
	}
	
	const permission = UserService.permission(to.path ) ;
	if(!permission){
		router.push({
			path: '/error' ,
			query: {
				code: '403'
			}
		}) ;
		return ;
	
	}
	next();
});

Vue.component('common-header' , Header) ;
Vue.component('slider-page' , SliderPage) ;

Vue.filter('dateFilter' , ( val: string , format: string ='y-m-d'  ) => {
	return val ? DateUtils.format( val , format ) : '无' ;
});
Vue.filter('nullFilter' , ( val: string , format: string ='y-m-d'  ) => {
	return val ? val : '无' ;
});


Vue.use( ElementUI );
new Vue({
	router,
	render: h => h(App)
}).$mount('#app') ;
