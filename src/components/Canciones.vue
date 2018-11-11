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
			var image = require.context('../assets/static/img/');
			return (this.artista.foto_path) ? this.artista.foto_path : image('./placeholder.png');
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';

ul {
	list-style: none;
	padding: 0;
	margin:0;
}

.clipper-imagen {
	width: 20rem;
	height: 19rem;
	overflow: hidden;
	position: relative;

	& img {
		height: auto;
		min-width: 100%;
		// max-width: 35rem;
		display: block;
		position: absolute;
	}
}

.contenedor-foto_artista {
	font-family: $knockout;
	position:relative;
	height:24rem;
	overflow: hidden;
	width: 20rem;
	margin:auto;
	background-color: $boton;
	border-radius: 1rem;
	top: -1.5rem;
}

.contenedor-foto_artista h2 {
	margin-top:1rem;
	margin-bottom: 1rem;
	text-align: center;
	text-transform: uppercase;
	text-overflow: ellipsis;
	overflow:hidden;
	font-size: 1.8rem;
	margin:0;
	margin-top:0.5rem;
	display:table-cell;
	vertical-align: middle;
}

.contenedor-catalogo_artista {
	overflow: scroll;
	overflow-x: hidden;
	min-height:12rem;
	max-height:20rem;
	margin-top:1rem;
}


.nomi {
	height:5rem;
	display:table;
	width:100%;
}


.elementos-cancion {
	padding-top: 0.8rem;
	padding-bottom: 0.4rem;
	padding-left: 0.5rem;
	max-height: 5rem;
	padding-right: 0.5rem;
	font-weight: bold;
}

.elementos-cancion span {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.6rem;
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

@media(min-width: 1024px) {

	.contendor-song_detail {
		padding: {
			left: 2rem;
		}
	}

	.clipper-imagen {
		width: 100%;
		overflow: hidden;
		position: relative;

		& img {
			display: block;
			position: absolute;
			min-width: 100%;
			max-width: 150%;
		}
	}

	.contenedor-foto_artista {
		// height:24rem;
		overflow: hidden;
		// width: 20rem;
		width: 35%;
		margin:auto;
		background-color: $boton;
		border-radius: 1rem;
		top: 0;
		display: inline-block;
	}

	.contenedor-catalogo_artista {
		overflow: scroll;
		overflow-x: hidden;
		min-height:12rem;
		max-height:20rem;
		margin-top:0;
		display: inline-block;
		vertical-align: top;
		// width:45rem;
		width:64.5%;
		float:right;
		min-height: 25rem;
	}
}


</style>