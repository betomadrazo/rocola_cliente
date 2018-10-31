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
			this.$emit('close');
			this.$store.dispatch('pedirCancion', this.cancion.id_cancion);
			router.push('/cola');
		}
	},
	computed: {
		...mapGetters(['cancion', 'artista']),
		getFotoPath() {
			return (this.cancion.foto_path) ? this.cancion.foto_path : 'http://www.betomad.com/rocola/consola/album_artwork/img_placeholder.jpg';
		}
	}
};

</script>

<style scoped>
	

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
	font-family: 'Roboto', sans-serif;
	letter-spacing: 1px;
    width: 300px;
    background-color: #FF9E16;
    height: 360px;
    text-align: center;
    margin: auto;
    border-radius: 15px;
    color: #fff;
}

.info {
	padding:10px;
	text-transform: uppercase;
}

.info h1 {
	font-size: 20px;
	font-weight: bold;
}

.info h3 {
	font-size: 18px;
	font-weight: 400;
}

.info h1, .info h3 {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	letter-spacing: 1px;
    margin: 0 auto;
}

.contenedor-imagen {
	position:relative;
	width: 300px;
	height:232px;
	overflow: hidden;
	border-radius: 15px 15px 0 0;
}

img {
	min-width:100%;
	position:absolute;
	display: block;
}

p:nth-of-type(1) {
	font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
}

button {
    width: 110px;
    border-radius: 20px;
    background-color: #7B5011;
    color: #fff;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    border: none;
    height: 32px;
    display: inline-block;
    line-height: 16px;
    text-transform: uppercase;
}

button:first-of-type {
	margin-right:20px;
    box-shadow: 1px 2px 0 #533605;
}

button:last-of-type {
	background-color: #999;
	text-transform: capitalize;
	box-shadow: 1px 2px 0 #333;
}

p:nth-of-type(2) {
	font-size: 16px;
	color: fuchsia;
	font-weight: bold;
	margin-bottom:0;
}

</style>