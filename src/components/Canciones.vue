<template>
	<div>
	<div class="contendor-song_detail">
		<div class="contenedor-foto_artista">
			<img src="https://enmoreaudio.com/wp-content/uploads/2017/10/RadioHed.jpg" alt="">
		</div>
		<h2>Radiohead</h2>
		<div class="elementos-cancion">
			<span class="titulo">Canci&oacute;n</span>
			<span class="album-o-artista">Album</span>
			<span class="duracion"> </span>
		</div>
		<div class="contenedor-catalogo_artista">
			<ul>
				<Cancion 
					@click.native="showModal=true" 
					v-for="(cancion, index) in canciones" 
					:id="cancion.id_cancion" 
					:cancion="cancion.cancion" 
					:artista_album="cancion.album" 
					:album="cancion.album" 
					:duracion="cancion.duracion" 
					:index="index" 
					:key="index"
				></Cancion>
			</ul>
		</div>
	</div>
		<router-link  class="linko" to="/"><span>Atr&aacute;s</span></router-link>

	<CancionDetail v-if="showModal" @close="showModal=false"></CancionDetail>
		
	</div>
	

</template>

<script>

import Cancion from './Cancion';
import CancionDetail from './CancionDetail';

export default {
	name: 'Canciones',
	components: {
		Cancion,
		CancionDetail
	},
	data: function() {
		return {
			canciones: [
				{id_cancion:1, artista: 'Radiohead', cancion: 'I Will', album: 'Hail To The Thief', duracion:'4:57'},
				{id_cancion:2, artista: 'Radiohead', cancion: 'There There', album: 'Hail To The Thief', duracion:'5:01'},
				{id_cancion:3, artista: 'Radiohead', cancion: 'Knives Out', album: 'Amnesiac', duracion:'3:46'},
				{id_cancion:4, artista: 'Radiohead', cancion: 'Let Down', album: 'OK Computer', duracion:'3:59'},
				{id_cancion:5, artista: 'Radiohead', cancion: 'Weird Fishes', album: 'In Rainbows', duracion:'4:20'}
			],
			showModal: false
		}
	},
	methods: {

	}
};

</script>

<style scoped>

ul {
	list-style: none;
	padding: 0;
	margin:0;
}

.contenedor-foto_artista {
	position:relative;
	height:150px;
	overflow: hidden;
}

img {
	width:100%;
	position:absolute;
	display: block;
}

.contenedor-catalogo_artista {
	overflow: scroll;
	overflow-x: hidden;
	min-height:120px;
	max-height:200px;
}


h2 {
	margin-top:5px;
	margin-bottom: 10px;
	text-align: center;
}

.elementos-cancion {
	padding-top: 8px;
	padding-bottom: 4px;
	padding-left:5px;
	padding-right:5px;
	font-weight: bold;
}

.elementos-cancion span {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}

.titulo {
	width: 48%;
}

.album-o-artista {
	width: 42%;
}
.duracion {
	width: 10%;
	text-align: center;
}


</style>