<template>
	<div>
		<!-- <Player></Player> -->
		<div class="contenedor-cola">
			<div v-if="cancionesEnCola.length">
				<div class="lacola">
					<ul style="margin:0;">
						<li>
							<Cancion v-for="(cancion, index) in cancionesEnCola" :index="index" :cancion="cancion"></Cancion>
						</li>
					</ul>
				</div>
				
			</div>
			<div v-else>
				<h2 class="mensaje-no_canciones" v-if="!mySongIsPlaying">No hay canciones en cola, escoge una canci&oacute;n.</h2>
			</div>
			<div class="contenedor-megaboton">
				<BotonPedir></BotonPedir>
			</div>
		</div>
		
	</div>
</template>

<script>
import router from '../main';

import { mapActions, mapGetters } from 'vuex';

import Player from './Player';
import Cancion from './Cancion';
import BotonPedir from './BotonPedir';

export default {
	name: 'Cola',
	components: {
		Player,
		Cancion,
		BotonPedir,
	},
	methods: {
		...mapActions(['getCancionesEnCola', 'getSeccion']),
		actualizaCola() {
			var self = this;
			window.setInterval(function() {
				self.$store.dispatch('getCancionesEnCola');
			}, 5000);
		}
	},
	computed: {
		...mapGetters(['cancionesEnCola', 'deviceId', 'mySongIsPlaying']),
	},
	created() {
	},
	mounted() {
		var ruta = this.$router.currentRoute.path;
		this.$store.dispatch('getSeccion', ruta);
	}
};

</script>

<style scoped>

.contenedor-cola {
	/* min-height: 12rem; */
	font-family:  'Knockout Feather', sans-serif;
	font-size: 1.6rem;
	position: relative;
}

ul {
	list-style: none;
	padding: 0;
}

.mensaje-no_canciones {
	margin: 0;
	font-size: 1.8rem;
	font-weight: 400;
	margin-top: 15rem;
	text-align: center;
}

.contenedor-megaboton {
    position: fixed;
    left: 0;
    margin: auto;
    padding-bottom: 2rem;
    width: 100%;
    bottom: 0;
    z-index: 500;
    text-align: center;
    /* height: 5.5rem; */
    padding-top: 2rem;
    background-color: #52a37a;
}

.lacola {
	min-height:9rem; 
	max-height:30rem; 
	margin-bottom:4rem; 
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
}

@media screen and (max-width: 767px) and (orientation: landscape), screen and (max-height: 767px) {
	.contenedor-megaboton {
		padding: 0.5rem 0 1rem 0;
	}
}

@media screen and (orientation: landscape) {
	.mensaje-no_canciones {
		margin-top:12rem;
	}
}

</style>