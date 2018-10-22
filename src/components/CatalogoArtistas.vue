<template>
	<div class="contenedor-catalogo">
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
		<ThumbArtista></ThumbArtista>
	</div>
</template>


<script>

import ThumbArtista from './ThumbArtista';

export default {
	name: 'CatalogoArtistas',
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