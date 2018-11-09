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
			<h4>{{ getMsgCanciones }}</h4>
		</div>
		<button :class="botonDesactivado" @click="podraPedir" class="boton-pedir boton-grande">agrega una canci&oacute;n</button>
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
			// si tiene canción pedida
			if(this.cancionPedida) {
				// mostrar el modal durante 3 segundos
				this.modalVisible = true;
				window.setTimeout(() => {
					this.modalVisible = false;
				}, 3000);
			} else if(this.puedePedir){
				this.$router.push('/catalogo');
			}
		},
		// cambia de número de segundos a minutos:segundos
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
		botonDesactivado: function() {
			console.log("canción pedida: ", this.cancionPedida, " vs ", "puede pedir: ", this.puedePedir)
			return {
				boton_desactivado: this.cancionPedida || !this.puedePedir
			};	
		},
		countDownCancion: function() {
			return this.getTiempoFormateado(this.segundosFaltantesEnCola + this.segundosFaltantesEnCancion);
		},
		getMsgCanciones: function() {
			if(this.cancionPedida && !this.mySongIsPlaying) {
				return `Tu canción sonará en ${this.countDownCancion} minutos.`;
			} else if(this.cancionPedida && this.mySongIsPlaying) {
				return "tu canción está sonando!";
			}

			if(!this.puedePedir) {
				return `Has alcanzado el límite de ${this.limiteCanciones} canciones al día.`;
			}
			
			return '';
		}
	},
};

</script>

<style lang="scss" scoped>

@import '../sass/estilo';

.modal {
	display:table !important;
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
    width: 300px;
    height: 50px;
    font-size: 20px;
    letter-spacing: -1px;
    line-height: 32px;
    box-shadow: 2px 4px 0 $boton_sombra;
	margin: auto;
	display: block;
}

.boton_desactivado {
    background-color: $boton_gris !important;
    box-shadow: 2px 4px 0 $boton_gris_sombra;
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
	letter-spacing: 1px;
	background-color: $naranja;
	width:280px;
	height:80px;
    text-align: center;
	border-radius: 10px;
	padding:10px;
    margin: auto;
    color: $blanco;
    font-weight: bold;
    display: table;
    text-transform: uppercase;
}

.alerta-cancion_pedida span {
	height:80px;
	display: table-cell;
}

h4 {
	margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 300px;
}

</style>

