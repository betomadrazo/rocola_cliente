import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { routerHistory, writeHistory } from 'vue-router-back-button';

import store from './store';

// import Bienvenido from './components/Bienvenido';
// import Cola from './components/Cola';
// import CatalogoArtistas from './components/CatalogoArtistas';
// import Canciones from './components/Canciones';

Vue.use(VueRouter);
Vue.use(routerHistory);


function loadView(view) {
  // return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}


export const router = new VueRouter({
	// base: '/',
	// mode: 'abstract',
	// mode: 'history',
	// routes: [
	// 	{path:'/', 					component: Bienvenido},
	// 	{path:'/cola', 			component: Cola},
	// 	{path:'/catalogo',  component: CatalogoArtistas},
	// 	{path:'/canciones', component: Canciones},
	// ],

	routes: [
		{path:'/', 					component: loadView('Bienvenido')},
		{path:'/cola', 			component: loadView('Cola')},
		{path:'/catalogo',  component: loadView('CatalogoArtistas')},
		{path:'/canciones', component: loadView('Canciones')},
	],

	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0};
	}
});

router.beforeEach((to, from, next) => {
	// console.log("to >", to, from, next);
	// console.log("from >", to, from, next);
	// console.log("next >", to, from, next);

	console.log('---to: ', to.path);
	console.log('from: ', from.path);
	console.log('next: ', next.path);
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
