<template>
	<div class="contenedor-pedir">

		<div class="detail-mask" :class="{modal: modalVisible}">
			<div class="detail-wrapper">
				<div class="alerta-cancion_pedida">
					<span>
						<p>podr&aacute;s agregar otra canci&oacute;n cuando la que elegiste haya finalizado</p>
					</span>
				</div>
			</div>
		</div>

		<div v-if="cancionPedida || !puedePedir">
			<h4 class="mensaje-canciones" v-html="getMsgCanciones"></h4>
		</div>
		<button @click="podraPedir" class="boton-pedir boton-grande">{{ msgBoton }}</button>
	</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'BotonPedir',

	data() {
		return {
			modalVisible: false,
		};
	},
	created() {
		this.$store.dispatch('getPuedePedir');
		console.log("puede pedir = ", this.puedePedir)
	},
	methods: {
		...mapActions(['getPuedePedir']),
		// al dar click al botón
		podraPedir() {
			this.$router.push('/catalogo');
		},
		// cambia de número de segundos a mm:ss
		getTiempoFormateado(segundos) {
			var tiempo = new Date(null);
			tiempo.setSeconds(segundos);
			return tiempo.toISOString().substr(14, 5);	
		},
	},
	computed: {
		...mapGetters([
			'cancionPedida', 
			'segundosFaltantesEnCola', 
			'segundosFaltantesEnCancion', 
			'currentPlayingDispositivoId', 
			'mySongIsPlaying',
			'puedePedir',
			'limiteCanciones',
		]),
		botonDesactivado() {
			return {
				boton_desactivado: this.cancionPedida || !this.puedePedir
			};	
		},
		countDownCancion() {
			return this.getTiempoFormateado(this.segundosFaltantesEnCola + this.segundosFaltantesEnCancion);
		},
		getMsgCanciones() {
			if(this.cancionPedida && !this.mySongIsPlaying) {
				let tiempoFaltante = ((this.segundosFaltantesEnCola + this.segundosFaltantesEnCancion) >= 60) ? 'minutos' : 'segundos';
				return `Tu canción sonará en ${this.countDownCancion} ${tiempoFaltante}.`;
			} else if(this.cancionPedida && this.mySongIsPlaying) {
				return "¡Tu canción está sonando!";
			} else if(!this.puedePedir) {
				return `Has alcanzado el l<span style="font-family:Arial, sans-serif;">í</span>mite de ${this.limiteCanciones} canciones al d<span style="font-family:Arial, sans-serif;">í</span>a.`;
			}
			
			return '';
		},
		msgBoton() {
			return (this.cancionPedida || !this.puedePedir) ? "ver catálogo" : "elige una canción";
		},

	},
};

</script>

<style lang="scss" scoped>

@import '../sass/estilo';

.modal {
	display: table !important;
}


.boton-pedir {
    border-radius: 16px;
    color: #fff;
    font-weight: bold;
    border: none;
    text-transform: uppercase;
}

.boton-grande {
    background-color: $boton;
    width: 90%;
    height: 4rem;
    font-size: 2.5rem;
    line-height: 4.3rem;
    box-shadow: 0.2rem 0.4rem 0 $boton_sombra;
	margin: auto;
	display: block;
}

.boton_desactivado {
    background-color: $boton_gris !important;
    box-shadow: 0.2rem 0.4rem 0 $boton_gris_sombra;
}

.boton-grande:active {
    background-color: $boton_sombra;
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
	display: none;
}

.detail-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.alerta-cancion_pedida {
	font-family: $knockout;
	background-color: $naranja;
	width: 80%;
	height:8rem;
    text-align: center;
	border-radius: 1rem;
	padding:1rem;
    margin: auto;
    color: $blanco;
    font-weight: bold;
    display: table;
    text-transform: uppercase;
}

.alerta-cancion_pedida span {
	height:8rem;
	display: table-cell;
}

.mensaje-canciones {
	margin: auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width: 30rem;
    font-family: $knockout;
    width: 100%;
}

</style>

