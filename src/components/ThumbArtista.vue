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

.wrapper-imagen {
	width:90px;
	height:90px;
	overflow:hidden;
	position:relative;
	border-radius:5px;
}

img {
	max-width:160px;
	max-height: 90px;
	min-height: 60px;
	display: inline-block;
	position:absolute;
	left:0;
	/*border: 1px solid;*/

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
}

</style>