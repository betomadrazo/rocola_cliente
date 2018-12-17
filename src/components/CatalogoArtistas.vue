<template>
	<div>
		<div class="contenedor-catalogo">
			<router-link to="canciones">
				<ThumbArtista v-for="artista in artistas" :artista="artista" :id_artista="artista.id_artista"></ThumbArtista>
			</router-link>
		</div>
	</div>
</template>


<script>
import router from '../main';

import Player from './Player';
import ThumbArtista from './ThumbArtista';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'CatalogoArtistas',
	components: {
		Player,
		ThumbArtista
	},
	created() {
	},
	mounted() {
		var ruta = this.$router.currentRoute.path;
		this.$store.dispatch('getSeccion', ruta);
		console.log("### ", this.artistas);
		this.$store.dispatch('setArtista', null);
		this.$store.dispatch('setCanciones', null);
	},
	methods: {
		...mapActions(['getSeccion', 'setArtista', 'setCanciones'])
	},
	computed: mapGetters(['artistas']),
};

</script>


<style scoped>

.contenedor-catalogo {
	min-height: 400px;
	padding: 10px;
	text-align: center;
	overflow-y: auto;
	scroll-behavior: smooth;
	z-index: 15;
}

</style>