<template>
	<div class="detail-mask">
		<div class="detail-wrapper">
			<div class="contenedor-detail">
				<div class="contenedor-imagen">
					<img :src="getFotoPath" alt="">
				</div>
				<div class="info">
					<h3>{{ artista.nombre_artista }}</h3>
					<h1>{{ cancion.titulo_cancion }}</h1>
					<p>{{ cancion.duracion }}</p>
					<button @click="pedirCancion">agregar</button>
					<button  @click="$emit('close')">cancelar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { router } from '../main';

export default { 
	name: 'CancionDetail',
	methods: {
		pedirCancion() {
			if(this.cancionPedida) {
				;
			} else {
				this.$store.dispatch('pedirCancion', this.cancion.id_cancion);
				var self = this;
				window.setTimeout(function() {
					self.$emit('close');
					router.push('/cola');
				}, 500);
			}
		}
	},
	computed: {
		...mapGetters(['cancion', 'artista', 'cancionPedida']),
		getFotoPath() {
			var image = require.context('../assets/static/img/');

			return (this.cancion.foto_path) ? this.cancion.foto_path : image('./placeholder.png');
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';	

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
	width: 75%;
    background-color: $boton;
    height: 75%;
    text-align: center;
    margin: auto;
    border-radius: 15px;
    color: $blanco;
}

.info {
	padding:1rem;
	text-transform: uppercase;

	& h1 {
		font-size: 2rem;
		font-weight: bold;
	}

	& h3 {
		font-size: 1.8rem;
	}
	
	& h1, & h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	    margin: 0 auto;
	}
}

.contenedor-imagen {
	position:relative;
	width: 100%;
	height:70%;
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

button {
    width: 11rem;
    border-radius: 2rem;
    background-color: $boton_agregar;
    color: $blanco;
    font-size: 1.6rem;
    text-align: center;
    font-weight: bold;
    border: none;
    height: 3.2rem;
    display: inline-block;
    line-height: 3.2rem;
    text-transform: uppercase;
}

button:first-of-type {
	margin-right:2rem;
    box-shadow: 1px 2px 0 $boton_agregar_sombra;

	&:active {
		background-color: 1px 2px 0 $boton_agregar_sombra;
	}
}

button:last-of-type {
	background-color: $boton_gris;
	text-transform: capitalize;
	box-shadow: 1px 2px 0 $boton_gris_sombra;

	&:active {
		background-color: 1px 2px 0 $boton_gris_sombra;
	}
}



</style>