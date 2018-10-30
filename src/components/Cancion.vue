<template>

		<!-- @click="$emit('open')"  -->
	<div 
		:class="alte" 
		class="contenedor-cancion"
		@click="setCancion"
	>
		<span class="titulo"><span class="flechita">&gt;</span>{{ cancion.titulo_cancion }}</span><span class="album-o-artista">{{ cancion.album }}</span><span class="duracion">{{ cancion.duracion }}</span>

	</div>

</template>

<script>

export default {
	name: 'Cancion',
	props: ['id_cancion', 'artista_album', 'cancion', 'album', 'duracion', 'index'],
	methods: {
		setCancion(){
			console.log(this.id_cancion);
			// this.$router.app.$emit('songData', this.cancion);
			// alert("song data");
			this.$store.dispatch('setCancion', this.id_cancion);

		},
	},
	computed: {
		alte: function() {
			return {
				cancion_alt: parseInt(this.index) % 2 === 0
			}	
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
	font-weight: bolder;
	text-align: left;
	margin-right:5px;
	vertical-align: middle;
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