<template>
	<div>
		<h1>Bienvenido a la rocola!</h1>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { router } from '../main';

export default {
	name: 'Bienvenido',
	created() {
		this.$store.dispatch('getCancionesEnCola');
		var to = setTimeout(function() {
			router.push('/cola');
		}, 2000);
	},
	methods: mapActions(['getCancionesEnCola']),
};
</script>

<style scoped>

h1 {
	text-align: center;
}

</style>