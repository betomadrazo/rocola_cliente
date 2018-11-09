<template>
	<div class="consola">
		<div class="navegador">
			<span v-if="$routerHistory.hasPrevious()">
				<router-link  class="linko atras" :to="{ path: $routerHistory.previous().path }"></router-link>
			</span>
			<span class="loguito">
			</span>
		</div>
		<div class="info">
			<h4>Ahora se escucha</h4>
			<h2>
				<span>{{ artistaAhoraServer }}</span> - <span>{{ cancionAhoraServer }}</span>
			</h2>
			<div>
				<span class="tiempo-total"><span>{{ printTranscurrido }}</span><span class="play"></span></span>
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
			tiempoRestante: 0,
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
		var moco = setInterval(this.songStatus, 3000);
	},
	methods: {
		...mapActions(['getPlayerVars', 'setSegundosFaltantesEnCancion']),

		// Esta inicia cada 3 segundos
		songStatus() {

			this.$store.dispatch('getPlayerVars');
			
			this.total = this.getTiempoFormateado(this.tiempoTotalServer);

			this.transcurrido = this.tiempoTranscurridoServer;

			this.restante = parseInt(this.total) - parseInt(this.tiempoTranscurridoServer);
	
			var currentTotal = this.tiempoTotalServer;
			var currentTranscurrido = this.tiempoTranscurridoServer;

			clearInterval(this.intervaloSegundos);

			this.transcurrido += 1;
			this.restante -= 1;

			currentTranscurrido += 1;
	
			if((currentTotal - currentTranscurrido) < 1) {
				console.log("esto qué pedo?")
				this.$store.dispatch('getPlayerVars');
			}

			var self = this;
			this.intervaloSegundos = setInterval(function() {

				self.transcurrido += 1;
				self.restante -= 1;

				currentTranscurrido += 1;
	
				if((currentTotal - currentTranscurrido) < 1) {
					console.log("####################################");
					clearInterval(this.intervaloSegundos);
					self.$store.dispatch('getPlayerVars');
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
		// ...mapGetters(['artistaAhora', 'cancionAhora', 'tiempoTotal', 'tiempoTranscurrido']),
		...mapGetters(['artistaAhoraServer', 'cancionAhoraServer', 'tiempoTotalServer', 'tiempoTranscurridoServer']),
		printTranscurrido() {
			var transcurrido = this.transcurrido;
			console.log("||||||||||> ", this.transcurrido);
			console.log("==========> ", this.tiempoTotalServer);
			if(this.transcurrido >= this.tiempoTotalServer) {
				console.log("finiche");
				transcurrido = 0;
			}
			return this.getTiempoFormateado(parseInt(this.transcurrido));
		},
		printFaltante() {
			var segundosFaltantesEnCancion = this.tiempoTotalServer - this.transcurrido;

			console.log(segundosFaltantesEnCancion);

			if(segundosFaltantesEnCancion < 0) {
				segundosFaltantesEnCancion = 0;
			}

			this.$store.dispatch('setSegundosFaltantesEnCancion', segundosFaltantesEnCancion);
			return this.getTiempoFormateado(parseInt(segundosFaltantesEnCancion));
		},
		getPorcentaje() {
			var porcentaje = this.transcurrido * 100 / this.tiempoTotalServer;
			return `width:${(porcentaje <= 100) ? porcentaje : 0}%;`;
		}
	},
}

</script>

<style lang="scss" scoped>
@import '../sass/estilo';

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
    height: 65px;
    position: relative;
    left: -20px;
    top: 0px;
    background-image: url(../assets/static/img/loguito.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 75%;
    display: inline-block;
}

.loguito img {
	height:24px;
}

.consola {
	text-align: center;
	color: #fff;
	background-color: $fondo_superior;
	padding-bottom: 0;
	position: fixed;
	width:100%;
	left:0;
	height:130px;
	top:0;
	z-index:100;
}

.info {
	padding:10px;
	padding-top:0;
	padding-bottom:10px;
}

.porcentaje {
	background-color: $linea_base_reproduccion;
	position:relative;
	width:58%;
	text-align: left;
	vertical-align: middle;
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

.porcentaje-transcurrido {
	background-color: $naranja;
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
    color: #468460;
    font-size: 40px;
    float: left;
    border: none !important;
    background-image: url(../assets/static/img/REGRESAR.png);
    background-size: 20px;
    background-repeat: no-repeat;
    width: 60px;
    height: 60px;
    background-position: center;
    display: inline-blocK;

	&:active {
		color: #ff8533;
    	background-image: url(../assets/static/img/REGRESAR_PRESS.png) !important;
	}
    
}

.play {
    background-image: url(../assets/static/img/PLAY.png);
    background-size: 5px;
    background-repeat: no-repeat;
    height: 10px;
    background-position: center;
    display: inline-blocK;
    vertical-align: middle;
	width:10px;
	display: inline-block;
	color: $play;
	position:relative;
}

.seccion {
	margin-top:0;
	font-weight: normal;
	width:100%;
	position:fixed;
	top:127px;
	padding-top:5px;
	padding-bottom:5px;
}

</style>