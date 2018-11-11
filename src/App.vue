<template>
	<div class="contenedor">
		<router-view></router-view>
	</div>
</template>

<script>
import axios from 'axios';
import Bienvenido from './components/Bienvenido';

import { mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
		Bienvenido,
	},
	created() {
		var self = this;
		let proxeneta = new Promise(function(resolve, reject) {
			self.$store.dispatch('getArtistas');
		});

		// window.onbeforeunload = function() { return "¿Deseas salir de la rocola?"; };

	},
	methods: mapActions(['getArtistas']),
};

</script>

<style scoped>

.contenedor {
	min-width:30rem;
	max-width: 102.4rem;
	margin:auto;
	margin-top:19rem;
	font-family: sans-serif;
	color: #fff;
}

</style>