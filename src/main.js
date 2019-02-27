import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { routerHistory, writeHistory } from 'vue-router-back-button';

import store from './store';

Vue.use(VueRouter);
Vue.use(routerHistory);

function loadView(view) {
  // return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

export const router = new VueRouter({
	routes: [
		{path:'/', 					component: loadView('Bienvenido')},
		{path:'/cola', 			component: loadView('Cola')},
		{path:'/catalogo',  component: loadView('CatalogoArtistas')},
		{path:'/canciones', component: loadView('Canciones')}
	],

	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0};
	}
});

router.beforeEach((to, from, next) => {
	next();
});

// router.replace('/');
router.afterEach(writeHistory);

new Vue({
	router,
	routerHistory,
	store,
	render: h => h(App)
}).$mount('#app');
