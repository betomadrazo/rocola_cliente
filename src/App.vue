<template>
	<div class="contenedor">
		<Player></Player>
		<router-view :artistas="artistas" @songData="songData"></router-view>
		<Status></Status>
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

export default {
	name: 'App',
	components: {
		Player,
		// CatalogoArtistas,
		// Canciones,
		// Cola,
		// BotonPedir,
		Status,
	},
	data() {
		return {
			artistas: [],
		}
	},
	created() {
		axios.get('http://www.betomad.com/rocola/consola/controllers/controller_musica.php', {
			params: {

				accion: 'get_artistas_activos',
				data: {}
				// key: API_KEY,
				// type: 'video',
				// part: 'snippet',
				// q: searchTerm
			}
		}).then(response => {
			console.log(response.data);
			this.artistas = response.data;
			// this.videos = response.data.items;
		});
	},
	methods: {
		songData(x) {
			alert("# ", x);
		}
	},
};

</script>

<style scoped>
	
.contenedor {
	min-width:300px;
	max-width: 1024px;
	margin:auto;
	margin-top:77px;
}

</style>