<template>
	<div>
		<div class="contenedor-catalogo">
			<!-- <div> -->
				<router-link v-for="artista in artistas" to="canciones" :key="artista.id_artista">
					<!-- cat->{{ artista }} -->
					<!-- <ThumbArtista  :artista="artista" :id_artista="artista.id_artista"></ThumbArtista> -->
					<ThumbArtista
						:artista="artista" 
						:id_artista="artista.id_artista">
					</ThumbArtista>
				</router-link>
			<!-- </div> -->
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
		if(!this.deviceId) {
			this.$router.push('/');
		}

		var ruta = this.$router.currentRoute.path;
		this.$store.dispatch('getSeccion', ruta);
		this.$store.dispatch('setArtista', null);
		this.$store.dispatch('setCanciones', null);
	},
	methods: {
		...mapActions(['getSeccion', 'setArtista', 'setCanciones'])
	},
	computed: mapGetters(['artistas', 'deviceId']),
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
	grid-gap: 40px;
}

</style>