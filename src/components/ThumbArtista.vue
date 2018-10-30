<template>
	<div class="contenedor-thumb" @click="getCanciones">
		<img :src="artista.foto_path" alt="">
		<p>{{ artista.nombre_artista }}</p>
	</div>
</template>
<script>
import axios from 'axios';
	
export default {
	name: 'ThumbArtista',
	props: ['artista', 'id_artista'],
	methods: {
		getCanciones(idArtista) {
			console.log("idArtista", idArtista);
			this.$store.dispatch('setArtista', idArtista);
		}
	}
};

</script>
<style scoped>
	
.contenedor-thumb {
	/*border:1px solid;*/	
	margin-top:4px;
	margin-bottom:4px;
	margin:4px;
	width:90px;
	height:110px;
	text-align: center;
	display: inline-block;
	/* vertical-align: bottom; */
	cursor: pointer;
}

img {
	width:100%;
	max-height: 90px;
	min-height: 60px;
	border: 1px solid;

}

p {
	margin: 0;
	color: #eee;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
	white-space: pre-wrap;
	max-height: 24px;
}

</style>