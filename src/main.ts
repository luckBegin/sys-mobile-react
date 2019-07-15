import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import ElementUI from 'element-ui';
import {Route} from "vue-router";
import {SesssionStorageService} from "@/service/storage";

Vue.config.productionTip = false;
// Vue.use(ElementUI);

const ignoreUrls = ['/403'];
router.beforeEach((to: Route, from: Route, next: () => void) => {
	const loginInfo = SesssionStorageService.get('userInfo');
	if (loginInfo && !!~ignoreUrls.indexOf(to.path)) {
		next()
	}
});

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
