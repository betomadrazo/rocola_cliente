<template>
	<div>
	<div class="contendor-song_detail">
		<div class="contenedor-foto_artista">
			<img :src="artista.foto_path" alt="">
			<h2>{{ artista.nombre_artista }}</h2>
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


ul {
	list-style: none;
	padding: 0;
	margin:0;
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
}

img {
	height: 80%;
	display: block;
}

.contenedor-catalogo_artista {
	overflow: scroll;
	overflow-x: hidden;
	min-height:120px;
	max-height:200px;
	margin-top:10px;
	/*background-color: #fff;*/
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