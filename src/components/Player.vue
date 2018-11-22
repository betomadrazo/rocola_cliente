<template>
	<div class="consola">
		<div class="contenedor_consola">
			<div class="navegador clearfix">
				<span v-if="$routerHistory.hasPrevious() && $router.history.current.path != '/cola'">
					<router-link  class="linko atras" :to="{ path: $routerHistory.previous().path }"></router-link>
				</span>
				<span class="loguito">
				</span>
			</div>
			<div class="info">
				<h4>Ahora se escucha</h4>
				<div class="artsy">
					<p>{{ artistaAhoraServer }}</p> - <p>{{ cancionAhoraServer }}</p>
				</div>
				<div>
					<span class="tiempo-total"><span>{{ segunderoTranscurridoForma() }}</span><span class="play"></span></span>
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
			currentTranscurrido: 0,

			segunderoTranscurrido: 0,
			segunderoFaltante: 0,
		};
	},
	created() {
		this.getContenido();
		this.segunderoTranscurridoForma();
	},
	mounted() {
		setTimeout(() => {
			this.cuentaSegsTranscurridos();

		}, 1500);
	},
	methods: {
		...mapActions(['getPlayerVars', 'setSegundosFaltantesEnCancion']),

		cuentaSegsTranscurridos() {
			var self = this;
			setInterval(() => {
				// console.log(self.segunderoTranscurrido);
				self.segunderoTranscurrido += 1;
			}, 1010);
		},

		cuentaSegsFaltantes() {
			var self = this;
			setInterval(() => {
				// console.log(self.segunderoFaltante);
				self.segunderoFaltante -= 1;
			}, 1010);
		},

		segunderoTranscurridoForma() {

			// console.log("%%%%%% ", this.tiempoTotalServer, this.segunderoTranscurrido);			

			var segs = this.segunderoTranscurrido;

			if(this.segunderoTranscurrido > this.tiempoTotalServer) {
				segs = 0;
			}

			return this.getTiempoFormateado(parseInt(segs));
		},

		segunderoRestateForma() {
			return this.getTiempoFormateado(parseInt(this.segunderoFaltante));
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
	watch: {
		printTranscurrido: function() {
			// this.cuentaSegsTranscurridos();
			// console.log("TRANSCURRIDO: ", this.segunderoTranscurrido);

			this.segunderoTranscurrido = this.transcurrido;
		},

		// printFaltante: function() {
		// 	this.segunderoFaltante = this.restante;
		// }

	},
	computed: {
		...mapGetters(['artistaAhoraServer', 'cancionAhoraServer', 'tiempoTotalServer', 'tiempoTranscurridoServer', 'total', 'transcurrido', 'restante', 'intervaloSegundos']),


		printTranscurrido() {
			// console.log("%%%%%% ", this.tiempoTotalServer, this.transcurrido);
			return this.getTiempoFormateado(parseInt(this.transcurrido));
		},
		printFaltante() {
			var segundosFaltantesEnCancion = this.tiempoTotalServer - this.segunderoTranscurrido;

			if(segundosFaltantesEnCancion < 0) {
				segundosFaltantesEnCancion = 0;
			}

			this.$store.dispatch('setSegundosFaltantesEnCancion', segundosFaltantesEnCancion);
			// return this.getTiempoFormateado(parseInt(this.restante));
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
	font-size: 1.6rem;
}

.artsy {
	& p {
		max-width: 40%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		vertical-align: middle;
		text-transform: uppercase;
		font-size:2rem;
		margin:0;
	}
}

// .clearfix::after {
//     content: "";
//     clear: both;
//     display: table;
// }

.navegador {
	width:100%;
	padding-top:1rem;
}

.loguito {
    float: right;
    width: 3rem;
    height: 3rem;
    position: relative;
    left: -1rem;
    top: 0px;
    background-image: url(../assets/static/img/loguito.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90%;
    display: inline-block;

	& img {
		height:2.4rem;
	}
}


.atras {
    text-decoration: none;
    color: #468460;
    float: left;
    border: none !important;
    background-image: url(../assets/static/img/REGRESAR.png);
    background-size: 50%;
    background-repeat: no-repeat;
    width: 3rem;
    height: 3rem;
    background-position: center;
    display: inline-blocK;

	&:active {
		color: #ff8533;
    	background-image: url(../assets/static/img/REGRESAR_PRESS.png) !important;
	}
    
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
	padding: 0 0.5rem 0.5rem 0.5rem;
	// padding:0.5rem;
	// padding-top:0;
	// padding-bottom:0.5rem;
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
	font-size:1.4rem;
}

.tiempo-total {
	width:22%;

	& span:nth-of-type(1) {
		width:80%;
		display: inline-block;
	}
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

.play {
    background-image: url(../assets/static/img/PLAY.png);
    background-size: 0.5rem;
    background-repeat: no-repeat;
    height: 1rem;
    background-position: left;
    display: inline-blocK;
    vertical-align: middle;
	width: 20%;
	display: inline-block;
	color: $play;
	position:relative;
}

.seccion {
	background-color: $fondo_app;
	font-family: $knockout;
	margin-top: 0;
	font-size: 2.5rem;
	width: 100%;
	padding-top: 0.5rem;
	font-size: 1.8rem;
	padding-bottom: 0.5rem;
	margin: auto;
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