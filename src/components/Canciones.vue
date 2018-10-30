<template>
	<div>
	<div class="contendor-song_detail">
		<div class="contenedor-foto_artista">
			<img :src="artista.foto_path" alt="">
		</div>
		<h2>{{ artista.nombre_artista }}</h2>
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
					:cancion="cancion"
					:id_cancion="cancion.id_cancion"
					:index="index"
				></Cancion>
			</ul>
		</div>
	</div>
	<div style="padding:20px; position:absolute; bottom:30px;">
		<router-link  class="linko atras" to="/"><span>&#8249;</span></router-link>
	</div>

	<CancionDetail v-if="showModal" @close="showModal=false"></CancionDetail>
		
	</div>
	

</template>

<script>

import Cancion from './Cancion';
import CancionDetail from './CancionDetail';

import { mapGetters } from 'vuex';

export default {
	name: 'Canciones',
	components: {
		Cancion,
		CancionDetail
	},
	data: function() {
		return {
			showModal: false,
		}
	},
	methods: {
	},
	computed: mapGetters(['canciones', 'artista']),
};

</script>

<style scoped>

.contendor-song_detail {
	background-color: #fff;
}

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
	background-color: #fff;
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

.atras {
    display: inline-block;
    border-radius: 50%;
    background-color: orangered;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    line-height: 32px;
    text-align: center;
    text-decoration: none;
    color:#000;
    font-weight:bolder;
    font-size:40px;
}


</style>