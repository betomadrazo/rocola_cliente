<template>
	<div>
		<Player></Player>
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
			<h2 class="mensaje-no_canciones" v-else>No hay canciones en cola, escoge una canci&oacute;n.</h2>
			<div class="contenedor-megaboton">
				<BotonPedir></BotonPedir>
			</div>
		</div>
		
	</div>
</template>

<script>
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
		...mapActions(['getCancionesEnCola']),
		actualizaCola() {
			var self = this;
			window.setInterval(function() {
				self.$store.dispatch('getCancionesEnCola');
			}, 5000);
		}
	},
	computed: {
		...mapGetters(['cancionesEnCola', 'deviceId']),
	},
	mounted() {
		this.actualizaCola();
	}
};

</script>

<style scoped>

.contenedor-cola {
	min-height: 300px;
	font-family:  'Knockout Feather', sans-serif;
	font-size: 1.6rem;
}

ul {
	list-style: none;
	padding: 0;
}

.mensaje-no_canciones {
	margin: 0;
	font-size: 1.8rem;
	font-weight: 400;
	margin-top: 300px;
	text-align: center;
}

.contenedor-megaboton {
    position: absolute;
    left: 0;
    margin: auto;
    width: 100%;
    bottom: 0;
    margin-bottom: 40px;
    text-align: center;
    min-height: 90px;
}

.lacola {
	min-height:90px; 
	max-height:300px; 
	margin-bottom:40px; 
	overflow-y:scroll;
}

</style>