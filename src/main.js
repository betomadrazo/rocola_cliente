import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

import store from './store';

import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'abstract',
	routes: [
		{path:'/', component: CatalogoArtistas},
		{path:'/canciones', component: Canciones},
	]
});

router.replace('/');

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');