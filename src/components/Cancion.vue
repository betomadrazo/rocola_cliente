<template>

	<div :class="alte" class="contenedor-cancion">

		<span class="titulo">{{ cancion }}</span><!--
	--><span class="album-o-artista">{{ artista_album }}</span><!--
	--><span class="duracion">{{ duracion }}</span>

	</div>

</template>

<script>

export default {
	name: 'Cancion',
	props: ['artista_album', 'cancion', 'album', 'duracion', 'index'],
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
	padding-top: 8px;
	padding-bottom: 4px;
	padding-left:5px;
	padding-right:5px;
}

.cancion_alt {
	background-color: #fff2e6;
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