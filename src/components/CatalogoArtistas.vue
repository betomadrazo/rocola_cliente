<template>

	<div class="contenedor-catalogo">
		<router-link to="Canciones">
		<ThumbArtista v-for="artista in artistas" :artista="artista" :id_artista="artista.id_artista"></ThumbArtista>
		</router-link>
	</div>
</template>


<script>

import ThumbArtista from './ThumbArtista';
import { mapGetters } from 'vuex';


export default {
	name: 'CatalogoArtistas',
	components: {
		ThumbArtista
	},
	methods: {
	},
	computed: mapGetters(['artistas']),
};

</script>


<style scoped>

.contenedor-catalogo {
	min-height: 400px;
	background-color: #ddd;
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