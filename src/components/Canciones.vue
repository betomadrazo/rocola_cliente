<template>
	<div>
	<Player></Player>
	<div class="contendor-song_detail">
		<div class="contenedor-foto_artista">
			<div class="clipper-imagen">
				<!-- <img :src="artista.foto_path" alt=""> -->
				<img :src="foto" alt="">
			</div>
			<div class="nomi">
				<h2>{{ artista.nombre_artista }}</h2>	
			</div>
		</div>
		<div class="contenedor-catalogo_artista">
			<ul>
				<Cancion 
					@click.native="showModal=true" 
					v-for="(cancion, index) in canciones" 
					:cancion="cancion"
					:id_cancion="cancion.id_cancion"
					:index="index"
				></Cancion>
			</ul>
		</div>
	</div>
	<CancionDetail v-if="showModal" @close="showModal=false"></CancionDetail>
		
	</div>
	

</template>

<script>

import Player from './Player';
import Cancion from './Cancion';
import CancionDetail from './CancionDetail';

import { mapGetters } from 'vuex';

export default {
	name: 'Canciones',
	components: {
		Player,
		Cancion,
		CancionDetail
	},
	data: function() {
		return {
			showModal: false,
		}
	},
	computed: {
		...mapGetters(['canciones', 'artista']),
		foto() {
			return (this.artista.foto_path) ? 
				this.artista.foto_path : 
				'http://betomad.com/rocola/consola/artist_photo/artist_placeholder.jpg';
		}
	}
};

</script>

<style scoped>


ul {
	list-style: none;
	padding: 0;
	margin:0;
}

.clipper-imagen {
	width: 200px;
	height: 190px;
	overflow: hidden;
	position: relative;
}

.contenedor-foto_artista {
	position:relative;
	height:240px;
	overflow: hidden;
	width: 200px;
	margin:auto;
	background-color: #FF9E16;
	border-radius: 10px;
	top: -15px;
}

.contenedor-foto_artista h2 {
	margin-top:10px;
	margin-bottom: 10px;
	text-align: center;
	text-transform: uppercase;
	text-overflow: ellipsis;
	overflow:hidden;
	/*white-space: nowrap;*/
	font-size: 18px;
	margin:0;
	margin-top:5px;
	display:table-cell;
	vertical-align: middle;
}

img {
	height: 190px;
	min-width: 100%;
	max-width: 350px;
	display: block;
	position: absolute;
}

.contenedor-catalogo_artista {
	overflow: scroll;
	overflow-x: hidden;
	min-height:120px;
	max-height:200px;
	margin-top:10px;
	/*background-color: #fff;*/
}


.nomi {
	height:50px;
	display:table;
	width:100%;
}


.elementos-cancion {
	padding-top: 8px;
	padding-bottom: 4px;
	padding-left:5px;
	max-height: 50px;
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