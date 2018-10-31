<template>
	<div class="contenedor-cola">
		<Player></Player>
		<div v-if="cancionesEnCola.length">
			<h2>Canciones en cola</h2>
			<div style="min-height:90px; max-height:300px; margin-bottom:40px; overflow-x:scroll;">
				<ul>
					<li>
						<!-- {{ cancionesEnCola }} -->
						<Cancion v-for="(cancion, index) in cancionesEnCola" :index="index" :cancion="cancion"></Cancion>
					</li>
				</ul>
			</div>
			
		</div>
		<h2 v-else>No hay canciones en cola, escoge una canci&oacute;n.</h2>
		<div>
			<router-link class="boton-pedir boton-grande" to="/catalogo" tag="button">Pedir canci&oacute;n</router-link>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Player from './Player';
import Cancion from './Cancion';

export default {
	name: 'Cola',
	components: {
		Player,
		Cancion,
	},
	computed: {
		...mapGetters(['cancionesEnCola']),
	}
};

</script>

<style scoped>

.contenedor-cola {
	min-height: 300px;
}

ul {
	list-style: none;
	padding: 0;
}


.boton-pedir {
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    border: none;
    text-transform: uppercase;
}

.boton-grande {
    background-color: #ff8533;
    width: 300px;
    height: 80px;
    font-size: 24px;
    line-height: 32px;
    box-shadow: 1px 4px 0 #533605;
	margin: auto;
	display: block;
}

.boton-grande:active {
    background-color: #ffcc63;
    box-shadow: none;
}


</style>