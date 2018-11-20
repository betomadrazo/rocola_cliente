<template>
	
	<div class="detail-mask">
		<div class="detail-wrapper">
			<div class="contenedor-detail">
				<div class="alerta-cancion_pedida" :class="{modal: modalVisible}">
					<span>
						<p>podr&aacute;s agregar otra canci&oacute;n cuando la que elegiste haya finalizado</p>
					</span>
				</div>
				<div class="contenedor-imagen">
					<img :src="getFotoPath" alt="">
				</div>
				<div class="info clearfix">
					<h3>{{ artista.nombre_artista }}</h3>
					<h1>{{ cancion.titulo_cancion }}</h1>
					<p>{{ cancion.duracion }}</p>
					<button :class="botonDesactivado" @click="pedirCancion">
						agregar
					</button>
					<button  @click="$emit('close')">cancelar</button>
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { router } from '../main';

export default { 
	name: 'CancionDetail',
	data() {
		return {
			modalVisible: false,
		};
	},
	created() {
		this.$store.dispatch('getPuedePedir');
		console.log("puede pedir = ", this.puedePedir);
	},
	methods: {
		...mapActions(['getPuedePedir']),
		pedirCancion() {
			// si tiene canción pedida
			if(this.cancionPedida) {
				// mostrar el modal durante 3 segundos
				this.modalVisible = true;
				window.setTimeout(() => {
					this.modalVisible = false;
				}, 3000);
			} else if(this.puedePedir){
				this.$router.push('/catalogo');

				this.$store.dispatch('pedirCancion', this.cancion.id_cancion);
				var self = this;
				window.setTimeout(function() {
					self.$emit('close');
					router.push('/cola');
				}, 500);
			}
		},
		// pedirCancion() {
		// 	if(this.cancionPedida) {
		// 		;
		// 	} else {
		// 		this.$store.dispatch('pedirCancion', this.cancion.id_cancion);
		// 		var self = this;
		// 		window.setTimeout(function() {
		// 			self.$emit('close');
		// 			router.push('/cola');
		// 		}, 500);
		// 	}
		// }
	},
	computed: {
		...mapGetters([
			'cancion', 
			'artista', 
			'cancionPedida',
			'puedePedir',
			'limiteCanciones',
		]),
		botonDesactivado: function() {
			console.log("canción pedida: ", this.cancionPedida, " vs ", "puede pedir: ", this.puedePedir)
			return {
				boton_desactivado: this.cancionPedida || !this.puedePedir
			};	
		},
		getMsgCanciones: function() {
			if(!this.puedePedir) {
				return `Has alcanzado el límite de ${this.limiteCanciones} canciones al día.`;
			}
			
			return '';
		},
		getFotoPath() {
			var image = require.context('../assets/static/img/');

			return (this.cancion.foto_path) ? this.cancion.foto_path : image('./placeholder.png');
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';	

.modal {
	display: table !important;
}


.alerta-cancion_pedida {
	font-family: $knockout;
	background-color: $naranja;
	width: 90%;
	height:13rem;
    text-align: center;
	border-radius: 1rem;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	padding:1rem;
    margin: auto;
    color: $blanco;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    display: none;
    z-index: 2;
}

.alerta-cancion_pedida span {
	height:8rem;
	display: table-cell;
	vertical-align: middle;
}



.boton_desactivado {
    background-color: $boton_gris !important;
    box-shadow: 0.2rem 0.4rem 0 $boton_gris_sombra;
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

.contenedor-detail {
	font-family: $knockout;
	width: 80%;
    background-color: $boton;
    // height: 75%;
    text-align: center;
    margin: auto;
    border-radius: 15px;
    color: $blanco;
	position: relative;
}

.info {
	padding:1rem;
	text-transform: uppercase;

	& h1 {
		font-size: 1.8rem;
	}

	& h3 {
		font-size: 1.5rem;
	}
	
	& h1, & h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	    margin: 0 auto;
	}
}

// .contenedor-imagen {
// 	position:relative;
// 	width: 100%;
// 	height:70%;
// 	overflow: hidden;
// 	border-radius: 15px 15px 0 0;
// }

.contenedor-imagen {
	position:relative;
	width: 100%;
	height:15rem;
	overflow: hidden;
	border-radius: 15px 15px 0 0;
}

img {
	width:100%;
	position:absolute;
	// left: 50%;
	// -webkit-transform: translateX(-50%);
	// transform: translateX(-50%);
	display: block;
}

p:nth-of-type(1) {
	font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
}

// button {
//     width: 11rem;
//     border-radius: 2rem;
//     background-color: $boton_agregar;
//     color: $blanco;
//     font-size: 1.6rem;
//     text-align: center;
//     font-weight: bold;
//     border: none;
//     height: 3.2rem;
//     display: inline-block;
//     line-height: 3.2rem;
//     text-transform: uppercase;
// }

button {
    // width: 6rem;
    width: 45%;
    border-radius: 2rem;
    background-color: $boton_agregar;
    color: $blanco;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    border: none;
    height: 2.5rem;
    display: inline-block;
    line-height: 2.5rem;
    text-transform: uppercase;
}

button:first-of-type {
	float: left;
	// margin-right:2rem;
    box-shadow: 1px 2px 0 $boton_agregar_sombra;
    width:50%;

	&:active {
		background-color: 1px 2px 0 $boton_agregar_sombra;
	}
}

button:last-of-type {
	width:40%;
	float: right;
	background-color: $boton_gris;
	text-transform: capitalize;
	box-shadow: 1px 2px 0 $boton_gris_sombra;

	&:active {
		background-color: 1px 2px 0 $boton_gris_sombra;
	}
}



</style>