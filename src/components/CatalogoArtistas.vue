<template>
	<div>
		<Player></Player>
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

.contenedor-catalogo {
	min-height: 400px;
	padding: 10px;
	text-align: center;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	scroll-behavior: smooth;
	overflow-scrolling: touch;
	border: 1px solid green;
	z-index: 15;
}

</style>