<template>
	<div class="consola">
		<div class="contenedor_consola">
			<div class="navegador clearfix">
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

		// TODO: Cambiar esta función al store
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
			// if(this.transcurrido >= this.tiempoTotalServer) {
			// 	console.log("finiche");
			// 	this.transcurrido = 0;
			// }
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
	font-size: 2rem;
}

h2 span {
	max-width: 14rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
	text-transform: uppercase;
	font-size:3rem;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.navegador {
	width:100%;
	padding-top:1rem
}

.loguito {
    float: right;
    width: 5rem;
    height: 5rem;
    position: relative;
    left: -2rem;
    top: 0px;
    background-image: url(../assets/static/img/loguito.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 75%;
    display: inline-block;
}

.loguito img {
	height:2.4rem;
}

.consola {
	text-align: center;
	color: #fff;
	font-family: $knockout_feather;
	font-size: 1.5rem;
	position: fixed;
	width:100%;
	left:0;
	top:0;
	z-index:100;
}

.contenedor_consola {
	background-color: $fondo_superior;
	padding-bottom: 0;
	margin: auto;
}

.info {
	padding:1rem;
	padding-top:0;
	padding-bottom:1rem;
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
	font-size:2rem;
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
    float: left;
    border: none !important;
    background-image: url(../assets/static/img/REGRESAR.png);
    background-size: 2rem;
    background-repeat: no-repeat;
    width: 6rem;
    height: 5rem;
    background-position: center;
    display: inline-blocK;

	&:active {
		color: #ff8533;
    	background-image: url(../assets/static/img/REGRESAR_PRESS.png) !important;
	}
    
}

.play {
    background-image: url(../assets/static/img/PLAY.png);
    background-size: 0.5rem;
    background-repeat: no-repeat;
    height: 10px;
    background-position: center;
    display: inline-blocK;
    vertical-align: middle;
	width:1rem;
	display: inline-block;
	color: $play;
	position:relative;
}

.seccion {
	font-family: $knockout;
	margin-top: 0;
	font-size: 2.5rem;
	width: 100%;
	padding-top: 0.5rem;
	font-size: 1.8rem;
	padding-bottom: 0.5rem;
	margin:auto;
}

@media(min-width: 1024px) {
	h2 span {
		max-width: 50rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		vertical-align: middle;
		text-transform: uppercase;
		font-size:3rem;
	}

}

</style>