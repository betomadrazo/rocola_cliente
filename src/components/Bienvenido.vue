<template>
	<div>
		<!-- <h1>{{ mensaje_bienvenida }}</h1> -->
		<!-- <img src="../assets/static/img/titulo_app.png" /> -->
		<div class="titulo_app"></div>
		<div class="textura">
			<div></div>
			<div></div>
		</div>
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
			}, 1000);






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
    width: 100%;
    height: 100%;
    background-image: url(/img/titulo_app.2e77a7d4.png);
    background-size: 75%;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.textura {
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left: 0;
	
	background-image: url(../assets/static/img/fondo_app.png);
	background-position: center;

	& div {
		width:30%; 
		height:100%; 
		background-image: url(../assets/static/img/rayas_app.png);

		&:nth-of-type(1) {
			float:left; 
		}
		&:nth-of-type(2) {
			float:right; 
		}
	}
}

@media(min-width:767px) {
	.titulo_app {
    	background-size: 50%;
	}
}

</style>