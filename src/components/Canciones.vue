<template>
	<div>
		<div class="contendor-song_detail">
			<div class="contenedor-foto_artista">
				<div class="clipper-imagen">
					<img :src="foto" alt="">
				</div>
				<div class="nomi">
					<span v-html="artista.nombre_artista"></span>
				</div>
			</div>
			<div class="contenedor-catalogo_artista" v-if="canciones.length > 0">
				<ul>
					<Cancion 
						@click.native="showModal=true" 
						v-for="(cancion, index) in canciones" 
						:cancion="cancion"
						:id_cancion="cancion.id_cancion"
						:index="index"
						v-if="cancion.id_cancion != cancionPedida || cancion.id_cancion != idCancionAhora"
						:key="index"
					></Cancion>
				</ul>
			</div>
			<div class="contenedor-catalogo_artista" v-else-if="canciones && !canciones.length">
				<img class="cargando-imagen" :src="loading">
			</div>
			<div class="contenedor-catalogo_artista" v-else>
				<h2>No hay canciones disponibles por el momento</h2>
			</div>
		</div>
		<CancionDetail v-if="showModal" @close="showModal=false"></CancionDetail>
	</div>
	
</template>

<script>
import router from '../main';

import Player from './Player';
import Cancion from './Cancion';
import CancionDetail from './CancionDetail';

import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'Canciones',
	components: {
		Player,
		Cancion,
		CancionDetail,
	},
	created() {
		console.log("(canciones) ARTISTA: ", this.artista);
		this.getCancionesDeArtista = setInterval(() => {
			this.$store.dispatch('setArtista', this.artista.id_artista);
		}, 1000);
	},
	mounted() {
		var ruta = this.$router.currentRoute.path;
		this.$store.dispatch('getSeccion', ruta);
		console.log("ID_SUCURSAL: ", this.ID_SUCURSAL);
	},
	destroyed() {
		clearInterval(this.getCancionesDeArtista);
	},
	data: function() {
		return {
			getCancionesDeArtista: null,
			showModal: false,
		}
	},
	computed: {
		...mapGetters(['canciones', 'artista', 'seccion', 'cancionPedida', 'idCancionAhora', 'ID_SUCURSAL']),
		foto() {
			var image = require.context('../assets/static/img/');
			return (this.artista.foto_path) ? this.artista.foto_path : image('./placeholder.png');
		},
		loading() {
			var image = require.context('../assets/static/img/');
			return image('./loading.gif');
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

.contenedor-foto_artista {
	font-family: $knockout;
	position:relative;
	overflow: hidden;
	width: 75%;
	height:17rem;	
	margin:auto;
	background-color: $boton;
	border-radius: 1rem;
	top: -1.5rem;
}

.clipper-imagen {
	width: 100%;
	height: 13rem;
	overflow: hidden;
	position: relative;

	& img {
		height: auto;
		width: 100%;
		display: block;
		position: absolute;
	}
}

.contenedor-foto_artista span {
	margin-top:1rem;
	margin-bottom: 1rem;
	text-align: center;
	text-transform: uppercase;
	text-overflow: ellipsis;
	overflow:hidden;
	font-size: 1.5rem;
	margin:0;
	margin-top:0.5rem;
	display:table-cell;
	vertical-align: middle;
}

.contenedor-catalogo_artista {
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
	min-height:12rem;
	max-height:20rem;
	margin-top:1rem;
}


.nomi {
	height:4rem;
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

.cargando-imagen {
	display: block;
	margin:auto;
	width:5rem;
}

@media screen and(min-width: 767px), screen and (orientation:landscape) {

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
		overflow: hidden;
		width: 35%;
		margin:auto;
		background-color: $boton;
		border-radius: 1rem;
		top: 0;
		display: inline-block;
	}

	.contenedor-catalogo_artista {
		overflow: auto;
		min-height:12rem;
		max-height:20rem;
		margin-top:0;
		display: inline-block;
		vertical-align: top;
		width:64.5%;
		float:right;
		min-height: 25rem;
	}
}

@media only screen and (max-width: 460px) {

}


</style>