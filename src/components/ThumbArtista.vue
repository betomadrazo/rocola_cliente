<template>
	<div class="contenedor-thumb" @click="getArtista">
		<div class="wrapper-imagen">
			<img :src="artista.foto_path" alt="">
		</div>
		<p>{{ artista.nombre_artista }}</p>
	</div>
</template>
<script>
import { mapActions } from 'vuex';
	
export default {
	name: 'ThumbArtista',
	props: ['artista', 'id_artista'],
	methods: {
		// ...mapActions(['setArtista']),
		getArtista() {
			this.$store.dispatch('setArtista', this.id_artista);
		}
	}
};

</script>
<style scoped>
	
.contenedor-thumb {	
	margin-top:4px;
	margin-bottom:4px;
	margin:10px;
	width:90px;
	height:110px;
	text-align: center;
	display: inline-block;
	cursor: pointer;
}

.wrapper-imagen {
	width:90px;
	height:90px;
	overflow:hidden;
	position:relative;
	border-radius:5px;
	box-shadow: 0 0 7px #000;
}

img {
	max-width:170px;
	max-height: 100px;
	min-height: 60px;
	display: inline-block;
	position:absolute;
	left:0;
}

p {
	margin: 0;
	margin-top:5px;
	color: #eee;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
	white-space: pre-wrap;
	height: 27px;
	font-family: sans-serif;
	font-weight: bold;
}

</style>