<template>
	<div>
		<!-- <h1>{{ mensaje_bienvenida }}</h1> -->
		<!-- <img src="../assets/static/img/titulo_app.png" /> -->
		<div class="titulo_app"></div>
	</div>
</template>

<script>
import Fingerprint2 from 'fingerprintjs2';

import { mapActions, mapGetters } from 'vuex';
import { router } from '../main';

export default {
	name: 'Bienvenido',
	data: function() {
		return {
			mensaje_bienvenida: "Bienvenido a \nla rocola\ndel péndulo",
		}
	},
	created() {
		var self = this;
		this.$store.dispatch('getCancionesEnCola');

		// pide las variables del player al servidor
		this.$store.dispatch('getPlayerVars');

		if(!this.deviceId) {
			if(window.requestIdleCallback) {
				requestIdleCallback(function() {
					Fingerprint2.get(function(components) {
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

/*

?c3VjdXJzYWxfaWQ9MSZub21icmVfc3VjdXJzYWw9Y29uZGVzYQ==

*/

		// var encryptedQueryString = window.location.search.substring(1);

		// try {
		// 	var decrypedQueryString = atob(encryptedQueryString);
		// } catch(error) {}

		// const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));

		// var encryptedQueryString = window.location.search.substring(1);

		// try {
		// 	var decrypedQueryString = atob(encryptedQueryString);
		// } catch(error) {}

		// const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));

		// if(ID_SUCURSAL) {
		// 		window.history.replaceState({}, document.title, "/");
			var to = setTimeout(function() {
				router.push('/cola');
			}, 20000);
		// } else {
		// 	this.mensaje_bienvenida = "Visítanos en nuestras sucursales"
		// }
	},
	methods: mapActions(['getCancionesEnCola', 'getPlayerVars', 'setDeviceId', 'getCancionPedida']),
	computed: mapGetters(['deviceId']),
};
</script>

<style lang="scss" scoped>
@import '../sass/estilo';

h1 {
	text-align: center;
}

.titulo_app {
	width:100%;
	min-height:500px;
	background-image: url(../assets/static/img/titulo_app.png);
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	display: block;

}

</style>