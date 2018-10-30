<template>
	<div class="detail-mask">
		<div class="detail-wrapper">
			<div class="contenedor-detail">
				<div class="contenedor-imagen">
					<img :src="cancion.foto_path" alt="">
				</div>
				<div class="info">
					<h1>{{ cancion.titulo_cancion }}</h1>
					<p>{{ cancion.duracion }}</p>
					<button @click="greet">Pedir canci&oacute;n</button>
					<p @click="$emit('close')">Cancelar</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
	name: 'CancionDetail',
	methods: {
		greet() {
			this.$store.dispatch('pedirCancion', this.cancion.id_cancion);
		}
	},
	computed: {
		...mapGetters(['cancion']),
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
	width:80%;
	background-color: #fff;
	min-height: 400px;
	text-align: center;
	margin:auto;
	border-radius: 2px;
}

.info {
	padding:10px;
}

.contenedor-imagen {
	position:relative;
	height:250px;
	overflow: hidden;
	border-radius: 2px 2px 0 0;
}

img {
	width:100%;
	position:absolute;
	display: block;
}

.contenedor-detail h1 {
	margin:0 auto;
}

p:nth-of-type(1) {
	font-size: 30px;
	margin-top:10px;
	margin-bottom:10px;
}

button {
	width:100%;
	background-color: #222;
	color: orangered;
	font-size: 24px;
	text-align: center;
	font-weight: bold;
	border: 0;
	height: 36px;
}

p:nth-of-type(2) {
	font-size: 16px;
	color: fuchsia;
	font-weight: bold;
	margin-bottom:0;
}

</style>