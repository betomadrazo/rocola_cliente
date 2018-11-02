<template>
	<div>
		<h1>Bienvenido a <br>la rocola<br>del p&eacute;ndulo</h1>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { router } from '../main';

export default {
	name: 'Bienvenido',
	created() {
		this.$store.dispatch('getCancionesEnCola');
		this.$store.dispatch('getPlayerVars');
		var to = setTimeout(function() {
			router.push('/cola');
		}, 2000);
	},
	methods: mapActions(['getCancionesEnCola', 'getPlayerVars']),
};
</script>

<style scoped>

h1 {
	text-align: center;
}

</style>