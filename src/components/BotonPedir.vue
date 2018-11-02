<template>

	<div class="contenedor-pedir">

		<div class="detail-mask">
			<div class="detail-wrapper">
				<div class="alerta-cancion_pedida">
					<span>
						<p>podr&aacute;s agregar otra canci&oacute;n cuando la que elegiste haya finalizado</p>
					</span>
				</div>
			</div>
		</div>

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
	methods: {
		pideCancion() {
			if(this.cancionPedida) {
				;
			}
		}
	},
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

.detail-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	display: table;
}

.detail-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.alerta-cancion_pedida {
	font-family: 'Roboto', sans-serif;
	letter-spacing: 1px;
	background-color: #ff8533;
	width:280px;
	height:80px;
    text-align: center;
	border-radius: 10px;
	padding:10px;
    margin: auto;
    color: #fff;
    font-weight: bold;
    display:table;
    text-transform: uppercase;
}

.alerta-cancion_pedida span {
	height:80px;
	display: table-cell;
}









h3 {
	margin-top:5px;
	margin-bottom: 5px;
	width:100%;
	height:20px;
}

</style>

