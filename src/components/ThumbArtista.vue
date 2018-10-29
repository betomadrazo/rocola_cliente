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
		getCanciones() {
			axios.get('http://www.betomad.com/rocola/consola/controllers/controller_musica.php', {
				params: {
					accion: 'get_canciones_de_artista_activo',
					id_artista: this.id_artista,
					data: {}
				}
			}).then(response => {
				console.log("canciones: ", response.data);
			});
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