<template>
	<div>
		<Player></Player>
		<h3 style="position:fixed; z-index: 2; text-align: center;">Artistas</h3>
		<div class="contenedor-catalogo">
			<router-link to="Canciones">
				<ThumbArtista v-for="artista in artistas" :artista="artista" :id_artista="artista.id_artista"></ThumbArtista>
			</router-link>
		</div>
	</div>
</template>


<script>

import Player from './Player';
import ThumbArtista from './ThumbArtista';
import { mapGetters } from 'vuex';

export default {
	name: 'CatalogoArtistas',
	components: {
		Player,
		ThumbArtista
	},
	methods: {
	},
	computed: mapGetters(['artistas']),
};

</script>


<style scoped>

h3 {
	margin-top:0;
	margin-bottom:10px;
	font-weight: normal;
	width:100%;
	position:fixed;
	background-color: #42A382;
	top:127px;
	padding-top:5px;
	padding-bottom:5px;
}

.contenedor-catalogo {
	min-height: 400px;
	padding: 10px;
	text-align: center;
	overflow: scroll;
	overflow-x: hidden;
	background-color: #42A382;
}

.linko {
	display: block;
	background-color: turquoise;
	width: 200px;
	height: 200px;
	margin: auto;
}

</style>