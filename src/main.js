import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{path:'/', component: CatalogoArtistas},
		{path:'/canciones', component: Canciones},
	]
});

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');