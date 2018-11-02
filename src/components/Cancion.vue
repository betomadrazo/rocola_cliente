<template>

		<!-- @click="$emit('open')"  -->
	<div 
		:class="alte" 
		class="contenedor-cancion"
		@click="setCancion"
	>
		<span class="titulo"><span class="flechita">&gt;</span>{{ cancion.titulo_cancion }}</span><span class="album-o-artista">{{ artistaOAlbum }}</span><span class="duracion">{{ cancion.duracion }}</span>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';


export default {
	name: 'Cancion',
	props: ['id_cancion', 'artista_album', 'cancion', 'album', 'duracion', 'index', 'isCola'],
	created() {
		console.log("canción pedida ", this.cancionPedida, "id canción ", this.cancion.id_cancion);

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

<style scoped>
	
.contenedor-cancion {
	padding-top: 2px;
	padding-bottom: 2px;
	padding-left:25px;
	padding-right:25px;
	font-weight: bold;
}

.cancion_alt {
	background-color: #61A693;
}

.flechita {
	color: #FF9E16;
	text-align: left;
	margin-right:5px;
	vertical-align: middle;
}

.tu_cancion {
	background-color:  #ff8533;
}

.tu_cancion .flechita {
	color:  #42A382;
	font-weight: bolder;
}

span {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 14px;
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