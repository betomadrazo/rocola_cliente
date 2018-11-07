<template>
	<div>
		<h1>Bienvenido a <br>la rocola<br>del p&eacute;ndulo</h1>
	</div>
</template>

<script>
import Fingerprint2 from 'fingerprintjs2';

import { mapActions, mapGetters } from 'vuex';
import { router } from '../main';

export default {
	name: 'Bienvenido',
	created() {
		var self = this;
		this.$store.dispatch('getCancionesEnCola');
		this.$store.dispatch('getPlayerVars');

		if(!this.deviceId) {
			if(window.requestIdleCallback) {
				requestIdleCallback(function() {
					Fingerprint2.get(function(components) {
						console.log(components);
	
						var values = components.map(function(component) { return component.value; });
						var murmur = Fingerprint2.x64hash128(values.join(''), 31);
	
						self.$store.dispatch('setDeviceId', murmur);

						self.$store.dispatch('getCancionPedida');

						self.$store.dispatch('getPuedePedir');
					});
				});
			} else {
				setTimeout(function() {
					Fingerprint2.get(function(components) {
	
						var values = components.map(function(component) { return component.value; });
						var murmur = Fingerprint2.x64hash128(values.join(''), 31);
	
						self.$store.dispatch('setDeviceId', murmur);
					})
				}, 500);
			}
		}



		var to = setTimeout(function() {
			router.push('/cola');
		}, 2000);
	},
	methods: mapActions(['getCancionesEnCola', 'getPlayerVars', 'setDeviceId', 'getCancionPedida']),
	computed: mapGetters(['deviceId']),
};
</script>

<style scoped>

h1 {
	text-align: center;
}

</style>