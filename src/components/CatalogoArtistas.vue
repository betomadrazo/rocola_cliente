<template>

	<div class="contenedor-catalogo">
		<router-link to="Canciones">
		<ThumbArtista v-for="artista in artistas" :artista="artista" :id_artista="artista.id_artista"></ThumbArtista>
		</router-link>
	</div>
</template>


<script>

import ThumbArtista from './ThumbArtista';

export default {
	name: 'CatalogoArtistas',
	props: ['artistas'],
	components: {
		ThumbArtista
	}
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
	background-color: #111;
}

.linko {
	display: block;
	background-color: emerald;
	width: 200px;
	height: 200px;
	margin: auto;
}

</style>