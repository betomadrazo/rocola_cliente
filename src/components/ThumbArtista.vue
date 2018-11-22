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
		getArtista() {
			this.$store.dispatch('setArtista', this.id_artista);
		}
	},
	computed: {
		foto() {
			var image = require.context('../assets/static/img/');
			return (this.artista.foto_path) ? this.artista.foto_path : image('./placeholder.png');
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';
	
.contenedor-thumb {	
	margin-top: 0.4rem;
	margin-bottom: 0.4rem;
	margin:0.8rem;
	width:9rem;
	height:11rem;
	text-align: center;
	display: inline-block;
	cursor: pointer;
	vertical-align: top;
}

.wrapper-imagen {
	width: 9rem;
	height: 9rem;
	overflow:hidden;
	position:relative;
	border-radius: 0.5rem;
	box-shadow: 0 0 0.7rem #000;
}

img {
	// max-width:17rem;
	// max-height: 10rem;
	max-height: 100%;
	min-height: 6rem;
	display: inline-block;
	position:absolute;
	left:0;
}

p {
	margin: 0;
	margin-top:0.5rem;
	color: #eee;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.2rem;
	white-space: pre-wrap;
	height: 4rem;
	font-family: $knockout;
}


</style>