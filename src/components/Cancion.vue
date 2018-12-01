<template>
	<div 
		:class="alte" 
		class="contenedor-cancion"
		@click="setCancion"
	>
		<span class="titulo"><span class="flechita"></span>{{ cancion.titulo_cancion }}</span><span :class="album_o_artista">{{ artistaOAlbum }}</span><span class="duracion">{{ cancion.duracion }}</span>
		<!-- <span class="titulo"><span class="flechita"></span>{{ cancion.titulo_cancion }}</span><span class="duracion">{{ cancion.duracion }}</span> -->
	</div>

</template>

<script>
import router from '../main';
import { mapGetters } from 'vuex';

export default {
	name: 'Cancion',
	props: ['id_cancion', 'artista_album', 'cancion', 'album', 'duracion', 'index', 'isCola'],
	methods: {
		setCancion(){
			console.log(this.id_cancion);
			this.$store.dispatch('setCancion', this.id_cancion);
		},
	},
	computed: {
		...mapGetters(['cancionPedida']),
		alte: function() {
			return {
				cancion_alt: parseInt(this.index) % 2 === 0,
				tu_cancion: this.cancionPedida === this.cancion.id_cancion
			};	
		},
		// album_o_artista() {
		// 	return {
		// 		(this.$router.currentRoute.path)
		// 	};
		// }
		artistaOAlbum: function() {
			return (this.cancion.cola) ? this.cancion.artista : '';
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';	
	
.contenedor-cancion {
	padding-left:1rem;
	padding-right:1rem;
	height: 3rem;
	line-height: 3rem;
	font-family: $knockout;
}

.cancion_alt {
	background-color: $cancion_alt;
}

.flechita {
	color: #FF9E16;
	text-align: left;
	margin-right:5px;
	vertical-align: middle;
    background-image: url(../assets/static/img/CANCION.png);
    background-size: 0.8rem;
    background-repeat: no-repeat;
    width: 1.6rem;
    height: 1.6rem;
    background-position: center;
    display: inline-blocK;
}

.tu_cancion {
	background-color:  #ff8533;
}

.tu_cancion .flechita {
	color:  #42A382;
	font-weight: bolder;
    background-image: url(../assets/static/img/CANCION_PEDIDA.png) !important;
}

span {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.6rem;
}

.titulo {
	width: 40%;
}

.album-o-artista {
	width: 40%;
}
.duracion {
	width: 20%;
	text-align: center;
}


</style>