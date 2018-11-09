<template>
	<div class="contenedor-thumb" @click="getArtista">
		<div class="wrapper-imagen">
			<img :src="foto" alt="">
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
	},
	computed: {
		foto() {
			return (this.artista.foto_path) ? 
				this.artista.foto_path : 
				'http://betomad.com/rocola/consola/album_artwork/placeholder.png';
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';


@font-face {
	font-family: 'Knockout Junior';
	src: url($font_path + "knockout-htf-29-junior-liteweight-1361516762.ttf") format("ttf");
}

@font-face {
	font-family: 'Knockout Feather';
	src: url($font_path + "knockout-htf-48-featherweight-1361516727.ttf") format("ttf");
}
	
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
	font-family: $knockout;
	font-weight: bold;
}

</style>