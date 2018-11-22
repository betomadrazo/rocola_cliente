import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { routerHistory, writeHistory } from 'vue-router-back-button';

import store from './store';

import Bienvenido from './components/Bienvenido';
import Cola from './components/Cola';
import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';

Vue.use(VueRouter);
Vue.use(routerHistory);

export const router = new VueRouter({
	base: '/rocolandia/',
	// mode: 'abstract',
	routes: [
		{path:'/', 					component: Bienvenido},
		{path:'/cola', 			component: Cola},
		{path:'/catalogo',  component: CatalogoArtistas},
		{path:'/canciones', component: Canciones},
	],
	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0};
	}
});

// router.replace('/');
router.afterEach(writeHistory);

new Vue({
	router,
	routerHistory,
	store,
	render: h => h(App)
}).$mount('#app');