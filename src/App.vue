<template>
	<div class="contenedor">
		<span v-if="$routerHistory.hasPrevious() && $router.history.current.path != '/'">
			<Player></Player>
		</span>
		<router-view></router-view>
	</div>
</template>

<script>
// import axios from 'axios';
import Bienvenido from './components/Bienvenido';
import Player from './components/Player';

import { mapActions } from 'vuex';

import router from './main';

export default {
	name: 'App',
	components: {
		Bienvenido,
		Player,
	},
	created() {
		var self = this;
		self.$store.dispatch('getCancionPedida');
		// let prom = new Promise(function(resolve, reject) {
			self.$store.dispatch('getArtistas');
			var artistas = setInterval(()=> {
				self.$store.dispatch('getArtistas');
			}, 120000);
		// });
	},
	methods: mapActions(['getArtistas', 'getCancionPedida']),
};

</script>

<style scoped>

.contenedor {
	/* min-width:30rem; */
	/* max-width: 102.4rem; */
	margin:auto;
	margin-top:12.8rem;
	font-family: sans-serif;
	color: #fff;
}


/* @media screen and (max-width: 767px) and (orientation: landscape), screen and (max-height: 767px) {
	.contenedor {
		margin-top:11rem;
	}
}
 */
/* @media screen and (orientation: landscape) {
	.contenedor {
		margin-top:10rem;
	}
}
 */
</style>