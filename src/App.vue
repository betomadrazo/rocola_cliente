<template>
	<div class="contenedor">
		<Player></Player>
		<CatalogoArtistas :artistas="artistas"></CatalogoArtistas>
		<router-view></router-view>
		<router-link to="/canciones">pederasta</router-link>
		<!-- <Canciones></Canciones> -->
		<!-- <BotonPedir></BotonPedir> -->
		<!-- <Cola></Cola> -->
		<Status></Status>
	</div>
</template>

<script>
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
		CatalogoArtistas,
		Canciones,
		Cola,
		BotonPedir,
		Status,
	},
	data() {
		return {
			artistas: [
				{'nombre_artista': 'Radiohead', 'id_artista': 1, foto_path:'https://consequenceofsound.files.wordpress.com/2016/02/radiohead.jpg?quality=80&w=807'},
				{'nombre_artista': 'The Beatles', 'id_artista': 2, foto_path:'https://ichef.bbci.co.uk/images/ic/960x540/p056fxzs.jpg'},
				{'nombre_artista': 'Pink Floyd', 'id_artista': 3, foto_path:'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Pink_Floyd_-_all_members.jpg/250px-Pink_Floyd_-_all_members.jpg'},
			],
		}
	}
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