import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

import store from './store';

import Bienvenido from './components/Bienvenido';
import Cola from './components/Cola';
import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: 'abstract',
	routes: [
		{path:'/', 					component: Bienvenido},
		{path:'/cola', 			component: Cola},
		{path:'/catalogo',  component: CatalogoArtistas},
		{path:'/canciones', component: Canciones},
	]
});

router.replace('/');

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');