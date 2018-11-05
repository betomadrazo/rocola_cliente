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
		<button :class="desactivado" @click="pedorro" class="boton-pedir boton-grande">agrega una canci&oacute;n</button>
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
	methods: {
		...mapActions(['getPuedePedir']),
		pedorro() {
			// if(this.cancionPedida || !this.puedePedir) {
			// 	this.modalVisible = true;
			// 	window.setTimeout(() => {
			// 		this.modalVisible = false;
			// 	}, 3000);
			// } else {
			// 	this.$router.push('/catalogo');
			// }
			if(this.cancionPedida) {
				this.modalVisible = true;
				window.setTimeout(() => {
					this.modalVisible = false;
				}, 3000);
			} else if(this.puedePedir){
				this.$router.push('/catalogo');
			}
		},
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
		desactivado: function() {
			console.log(this.cancionPedida, " === ", this.puedePedir)
			return {
				// boton_desactivado: this.cancionPedida || this.puedePedir
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
	created() {
		this.$store.dispatch('getPuedePedir');
	}
};

</script>

<style scoped>

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
	display: none;
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

h4 {
	margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 300px;
}

</style>

