import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';
		// Player,
		// CatalogoArtistas,
		// Canciones,
		// Cola,
		// BotonPedir,
		// Status,

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{path:'/', component: CatalogoArtistas},
		{path:'/canciones', component: Canciones},
	],
	methods: {
		songData(x) {
			alert("# ", x);
		}
	}
});

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');