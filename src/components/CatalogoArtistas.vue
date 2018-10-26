<template>
	<div class="contenedor-catalogo">
		<ThumbArtista v-for="artista in artistas" :artista="artista">fd</ThumbArtista>
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

</style>