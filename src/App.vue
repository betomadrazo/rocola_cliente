<template>
	<div class="contenedor">
		<Player></Player>
		<router-view></router-view>
		<!-- <Status></Status> -->
	</div>
</template>

<script>
import axios from 'axios';
import Player from './components/Player';
import CatalogoArtistas from './components/CatalogoArtistas';
import Canciones from './components/Canciones';
import Cola from './components/Cola';
import BotonPedir from './components/BotonPedir';
import Status from './components/Status';

import { mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
		Player,
		Status,
	},
	created() {
		var self = this;
		let proxeneta = new Promise(function(resolve, reject) {
			self.$store.dispatch('getArtistas');
		});
	},
	methods: mapActions(['getArtistas']),
};

</script>

<style scoped>
	
.contenedor {
	min-width:300px;
	max-width: 1024px;
	margin:auto;
	margin-top:160px;
	font-family: sans-serif;
	color: #fff;
}

</style>