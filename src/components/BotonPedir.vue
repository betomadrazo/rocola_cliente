<template>
	<div class="contenedor-pedir">
		<div v-if="cancionPedida">
			<h3>Tu canci&oacute;n sonar&aacute; en </h3>
		</div>
		<router-link :class="desactivado" class="boton-pedir boton-grande" to="/catalogo" tag="button">agrega una canci&oacute;n</router-link>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'BotonPedir',
	computed: {
		...mapGetters(['cancionPedida']),
		desactivado: function() {
			return {
				boton_desactivado: this.cancionPedida
			};	
		},
	}
};

</script>
<style scoped>

.boton-pedir {
    border-radius: 16px;
    color: #fff;
    font-weight: bold;
    border: none;
    text-transform: uppercase;
}

.boton-grande {
    background-color: #ff8533;
    width: 300px;
    height: 50px;
    font-size: 20px;
    letter-spacing: -1px;
    line-height: 32px;
    box-shadow: 2px 4px 0 #CB8222;
	margin: auto;
	display: block;
}

.boton_desactivado {
    background-color: #ddd !important;
    box-shadow: 2px 4px 0 #666;
}

.boton-grande:active {
    background-color: #ffcc63;
    box-shadow: none;
}

h3 {
	margin-top:5px;
	margin-bottom: 5px;
	width:100%;
	height:20px;
}

</style>

