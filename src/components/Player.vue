<template>
	<div class="consola">
		<div class="navegador">
			<span v-if="$routerHistory.hasPrevious()">
				<router-link  class="linko atras" :to="{ path: $routerHistory.previous().path }">&#12296;</router-link>
			</span>
			<span class="loguito">
			</span>
		</div>
		<div class="info">
			<h4>Ahora se escucha</h4>
			<h2>
				<span>{{ artistaAhora }}</span> - <span>{{ cancionAhora }}</span>
			</h2>
			<div>
				<span class="tiempo-total"><span>{{ printTranscurrido }}</span><span>&#8250;</span></span>
				<span class="porcentaje">
					<span class="porcentaje-transcurrido" :style="getPorcentaje"></span>
				</span>
				<span class="tiempo-transcurrido">{{ printFaltante }}</span>
			</div>
		</div>
		<div v-if="displayContenido">
			<h3 class="seccion">{{ contenido }}</h3>
		</div>
	</div>
</template>

<script>
import router from '../main';
import { mapActions, mapGetters } from 'vuex';
	
export default {
	name: 'Player',
	data: () => {
		return {
			contenido: '',
			displayContenido: true,
			tiempoRestante: null,
			tiempoFaltante: 0,
			transcurrido: 0,
			restante: 0,
			total: 0,
			intervaloSegundos: null,
			currentTranscurrido: 0,
		};
	},
	created() {
		this.getContenido();
		this.songStatus();
		var moco = setInterval(this.songStatus, 20000);
	},
	methods: {
		...mapActions(['getPlayerVars', 'setSegundosFaltantesEnCancion']),

		songStatus() {
			this.$store.dispatch('getPlayerVars');
			
			this.total = this.getTiempoFormateado(this.tiempoTotal);

			this.transcurrido = this.tiempoTranscurrido;
			this.restante = parseInt(this.total) - parseInt(this.tiempoTranscurrido);
	
			var currentTotal = this.tiempoTotal;
			var currentTranscurrido = this.tiempoTranscurrido;

			clearInterval(this.intervaloSegundos);

			var self = this;
			this.intervaloSegundos = setInterval(function() {

				self.transcurrido += 1;
				self.restante -= 1;

				currentTranscurrido += 1;
	
				if((currentTotal - currentTranscurrido) < 1) {
					self.$store.dispatch('getPlayerVars');
					// getInfoDeCancionEnPlay();
				}
			}, 1000);
		},

		getTiempoFormateado(segundos) {
			var tiempo = new Date(null);
			tiempo.setSeconds(segundos);
			return tiempo.toISOString().substr(14, 5);	
		},

		getContenido() {
			switch(this.$router.currentRoute.path) {
				case '/cola':
				this.displayContenido = true;
				this.contenido = 'Canciones en cola...';
				break;
				case '/catalogo':
				this.displayContenido = true;
				this.contenido = 'Artistas';
				break;
				case '/canciones':
				this.displayContenido = false;
				break;
				default:
				this.displayContenido = false;
			}
		},

	},
	computed: {
		...mapGetters(['artistaAhora', 'cancionAhora', 'tiempoTotal', 'tiempoTranscurrido']),
		printTranscurrido() {
			return this.getTiempoFormateado(parseInt(this.transcurrido));
		},
		printFaltante() {
			var segundosFaltantesEnCancion = this.tiempoTotal - this.transcurrido;
			this.$store.dispatch('setSegundosFaltantesEnCancion', segundosFaltantesEnCancion);
			return this.getTiempoFormateado(parseInt(segundosFaltantesEnCancion));
		},
		getPorcentaje() {
			var porcentaje = this.transcurrido * 100 / this.tiempoTotal;
			return `width:${(porcentaje <= 100) ? porcentaje : 0}%;`;
		}
	},
}

</script>

<style scoped>

h4, h3, h2 {
	margin-top:0;
	margin-bottom:0;
}

h2 span {
	max-width: 140px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
	text-transform: uppercase;
	font-size:18px;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.navegador {
	height:50px;
	width:100%;
}

.loguito {
    float: right;
    width: 50px;
    height: 49px;
    position: relative;
    left: -20px;
    top: 0px;
    background-image: url(../assets/static/img/loguito.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 75%;
}

.loguito img {
	height:24px;

}

.consola {
	text-align: center;
	color: #fff;
	background-color: #45A774;
	padding-bottom: 0;
	position: fixed;
	width:100%;
	left:0;
	height:130px;
	top:0;
	z-index:100;
	/*box-shadow: 0 0 15px #000;*/
}

.info {
	padding:10px;
	padding-top:0;
	padding-bottom:10px;
}

.porcentaje {
	background-color: #000;
	background-color: #197A56;
	position:relative;
	width:58%;
	text-align: left;
}

.tiempo-total, .tiempo-transcurrido {
	font-weight: bold;
	width:18%;
	display:inline-block;
}

.tiempo-total {
	width:22%;
}

.tiempo-total span:nth-of-type(1) {
	width:85%;
	display: inline-block;
}

.tiempo-total span:nth-of-type(2) {
	width:15%;
	display: inline-block;
	text-align: left;
	vertical-align: middle;
	font-size:16px;
	color: orange;
}

.porcentaje-transcurrido {
	background-color: #ff8533;
	width:30%;
	
}

.porcentaje, .porcentaje-transcurrido {
	border-radius:3px;
	display: inline-block;
	height:5px;
}

.porcentaje-transcurrido {
	position:absolute;
	width:60%;
}

.atras {
    text-decoration: none;
    color: #197A56;
    font-size: 40px;
    float: left;
    border: none !important;
}

.atras:active {
	color: #ff8533;
}


.seccion {
	margin-top:0;
	font-weight: normal;
	width:100%;
	position:fixed;
	background-color: #42A382;
	top:127px;
	padding-top:5px;
	padding-bottom:5px;
}

</style>