import Vuex from 'vuex';
import Vue from 'vue';
import artistas from './modules/artistas';
import player from './modules/player';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		artistas,
		player,
	},
	plugins: [createPersistedState(
		// {
		// paths: [

		// 	'player',
		// 	'bienvenido'

		// 	// 'artistaAhoraServer',
		// 	// 'cancionAhoraServer',
		// 	// 'idCancionAhora',
		// 	// 'tiempoTotalServer',
		// 	// 'tiempoTranscurridoServer',
		// 	// 'porcentaje',
		// 	// 'mySongIsPlaying',
		// 	// 'currentPlayingDispositivoId',
		// 	// 'total',
		// 	// 'transcurrido',
		// 	// 'restante',
		// 	// 'intervaloSegundos',
		// 	// 'seccion'
		// ]
	// }
	)],
});