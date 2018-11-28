<template>
	<div>
		<div class="titulo_app" :style="getTitular"></div>
		<div class="textura">
			<div></div>
			<div></div>
		</div>
		<div class="fondo_app"></div>
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
			ID_SUCURSAL: null,
		}
	},
	created() {

		this.$store.dispatch('songStatus');

		var self = this;
		this.$store.dispatch('getCancionesEnCola');

		// pide las variables del player al servidor
		// this.$store.dispatch('getPlayerVars').then(

		// );

		if(!this.deviceId) {
			if(window.requestIdleCallback) {
				requestIdleCallback(function() {
					Fingerprint2.get(function(components) {
						var values = components.map(function(component) { return component.value; });
						var murmur = Fingerprint2.x64hash128(values.join(''), 31);
	
						console.log(murmur);

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

						console.log(murmur);
					})
				}, 500);
			}
		}

		var encryptedQueryString = window.location.search.substring(1);

		try {
			var decrypedQueryString = atob(encryptedQueryString);
		} catch(error) {}

		this.ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));

		var encryptedQueryString = window.location.search.substring(1);

		try {
			var decrypedQueryString = atob(encryptedQueryString);
		} catch(error) {}

		// const ID_SUCURSAL = parseInt(new URLSearchParams(decrypedQueryString).get('sucursal_id'));

		// Esta no es una solución satisfactoria, hay que explorar los promises y los async await.
		setTimeout(() => {
			this.$store.dispatch('getPlayerVars').then(() => {
				if(this.ID_SUCURSAL && this.artistaAhoraServer) {
					window.history.replaceState({}, document.title, "/");
					router.push('/cola');
				}
			});
		}
		, 5000);

	},
	methods: {
		...mapActions(['getCancionesEnCola', 'getPlayerVars', 'setDeviceId', 'getCancionPedida', 'songStatus']),
	},
	computed: {
		...mapGetters(['deviceId', 'artistaAhoraServer']),
		getTitular() {
			var image = require.context('../assets/static/img/');
			console.log(image('./titulo_app.png'));

			return (this.ID_SUCURSAL) ? `background-image: url(${image('./titulo_app.png')});`
									  : `background-image: url(${image('./VISITANOS-APP.png')});`
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../sass/estilo';

h1 {
	text-align: center;
}

.fondo_app, .titulo_app {
    width: 100%;
    height: 100%;
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.titulo_app {
    background-size: 75%;
    background-position: center;
    background-repeat: no-repeat;
}

.textura {
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left: 0;
	background-image: radial-gradient(#9cca82, #06938E 70%);
	background-position: center;
	background-repeat: no-repeat;

	& div {
		width:30%; 
		height:100%; 

		&:nth-of-type(1) {
			background-image: url(../assets/static/img/rayas_app_a.png);
			float:left;
			background-repeat: repeat-y;
    		background-position: left;
		}
		&:nth-of-type(2) {
			float:right; 
			background-image: url(../assets/static/img/rayas_app_b.png);
			background-repeat: repeat-y;
    		background-position: right;
		}
	}
}
	
@media(min-width:600px) {
	.titulo_app {
    	background-size: 35%;
	}
}

</style>