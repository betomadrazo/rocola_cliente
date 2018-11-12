<template>
	<div 
		:class="alte" 
		class="contenedor-cancion"
		@click="setCancion"
	>
		<span class="titulo"><span class="flechita"></span>{{ cancion.titulo_cancion }}</span><span class="album-o-artista">{{ artistaOAlbum }}</span><span class="duracion">{{ cancion.duracion }}</span>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';


export default {
	name: 'Cancion',
	props: ['id_cancion', 'artista_album', 'cancion', 'album', 'duracion', 'index', 'isCola'],
	created() {
		// console.log("canción pedida ", this.cancionPedida, "id canción ", this.cancion.id_cancion);

	},
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
		artistaOAlbum: function() {
			return (this.cancion.cola) ? this.cancion.artista : this.cancion.album;
		}
	}
};

</script>

<style lang="scss" scoped>
@import '../sass/estilo';	
	
.contenedor-cancion {
	padding-left:2rem;
	padding-right:2rem;
	height: 3.3rem;
	line-height: 3.3rem;
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
    width: 1rem;
    height: 1rem;
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
	font-size: 1.5rem;
}

.titulo {
	width: 48%;
}

.album-o-artista {
	width: 42%;
}
.duracion {
	width: 10%;
	text-align: center;
}


</style>