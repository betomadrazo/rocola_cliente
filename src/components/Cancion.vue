<template>
	<div 
		:class="alte" 
		class="contenedor-cancion"
		@click="setCancion"
	>
		<span class="titulo" :class="cancion_larga"><span class="flechita"></span>{{ cancion.titulo_cancion }}</span><span class="album-o-artista" :class="album_o_artista">{{ artistaOAlbum }}</span><span class="duracion">{{ cancion.duracion }}</span>
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
		album_o_artista: function() {
			return {
				no_album: this.$router.currentRoute.path != '/cola',
			};
		},
		cancion_larga: function() {
			return {
				cancion_larga: this.$router.currentRoute.path != '/cola'
			};
		},
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
	font-family: $knockout;
}

.cancion_alt {
	background-color: $cancion_alt;
}

.no_album {
	display: none !important;		
}

.cancion_larga {
	width: 90% !important;
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
	box-sizing: border-box;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.6rem;
	padding-right: 0.5rem;
	height: 3rem;
	line-height: 3rem;
}

.titulo {
	width: 50%;
}

.album-o-artista {
	width: 40%;
}
.duracion {
	width: 10%;
	text-align: right;
}


</style>