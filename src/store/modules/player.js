import Vue from 'vue';
import $ from 'jquery-ajax';
import _ from 'lodash';
import { BASE_URL, ID_SUCURSAL } from '../../api/rocola';


const state = {
	artistaAhoraServer: " ",
	cancionAhoraServer: " ",
	idCancionAhora: null,
	tiempoTotalServer: 0,
	tiempoTranscurridoServer: 0,
	porcentaje: 0,
	mySongIsPlaying: false,
	currentPlayingDispositivoId: null,


	// tíos extraños
	total: 0,
	transcurrido: 0,
	restante: 0,
	intervaloSegundos: null,
};


const getters = {
	artistaAhoraServer: state => state.artistaAhoraServer,
	cancionAhoraServer: state => state.cancionAhoraServer,
	idCancionAhora: state => state.idCancionAhora,
	tiempoTotalServer: state => state.tiempoTotalServer,
	tiempoTranscurridoServer: state => state.tiempoTranscurridoServer,
	currentPlayingDispositivoId: state => state.currentPlayingDispositivoId,
	mySongIsPlaying: state => state.mySongIsPlaying,




	total: state => state.total,
	transcurrido: state => state.transcurrido,
	restante: state => state.restante,
	intervaloSegundos: state => state.intervaloSegundos,




};


const actions = {

	getPlayerVars({ commit, dispatch, getters, rootGetters }) {
		
		$.ajax({
			url: BASE_URL,
			type: 'GET',
			dataType: 'json',
			data: {
				accion: 'get_current_song_status',
				sucursal_id: ID_SUCURSAL,
			},
			success: function(info) {
				commit('setArtistaAhoraServer', info.artista);
				commit('setCancionAhoraServer', info.titulo_cancion);
				commit('setIdCancionAhora', info.cancion_id);
				commit('setTiempoTotalServer', info.tiempo_total);
				commit('setTiempoTranscurridoServer', info.tiempo_transcurrido);

				if(parseInt(info.cancion_id) === rootGetters.cancionPedida) {
					commit('setMySongIsPlaying', true);
				} else {
					if(state.mySongIsPlaying) {
						commit('setMySongIsPlaying', false);

						$.ajax({
							url: BASE_URL,
							type: 'POST',
							dataType: 'json',
							data: {
								accion: 'set_cancion_as_ya_tocada',
								song_id: rootGetters.cancionPedida,
								sucursal_id: ID_SUCURSAL,
								dispositivo_id: rootGetters.deviceId,
								added_at: rootGetters.horaCancionPedida,
							},
							success: function(re) {
								console.log("3333", re);
							},
							error: function(a, b) {
								console.log(" **** ", a, b);
							}
						}); 

						commit('setCancionPedida', null, {root: true});
						commit('setHoraCancionPedida', null, {root: true});
					}

					dispatch('setMySongIsPlaying', false);
				}
			},
 			error: function(response, p) {
				console.log("error->", response, p);
			}
		});
	},

	setMySongIsPlaying({ commit }, value) {
		commit('setMySongIsPlaying', value);
	},





	songStatus({commit, dispatch, getters, rootGetters}) {

		var currentTranscurrido = state.tiempoTranscurridoServer;
		console.log("inicia transcurrido", currentTranscurrido);

		setInterval(() => {
			currentTranscurrido = state.tiempoTranscurridoServer;

			dispatch('getPlayerVars');
				
			console.log(">>> ", state.tiempoTranscurridoServer);

			commit('setTotal', getTiempoFormateado(state.tiempoTotalServer));
	

			commit('setTranscurrido', state.tiempoTranscurridoServer);
	

			commit('setRestante', parseInt(state.total) - parseInt(state.tiempoTranscurridoServer));
	
		
			var currentTotal = state.tiempoTotalServer;

			clearInterval(this.intervaloSegundos);

			this.transcurrido += 1;
		
			if((currentTotal - currentTranscurrido) < 1) {
				dispatch('getPlayerVars');
			}

			console.log(currentTranscurrido);

			currentTranscurrido += 1;

		}, 1000);

	}, // fin songStatus





};


const mutations = {
	setArtistaAhoraServer(state, artista) {
		state.artistaAhoraServer = artista;
	},
	setCancionAhoraServer(state, cancion) {
		state.cancionAhoraServer = cancion;
	},
	setIdCancionAhora(state, idCancion) {
		state.idCancionAhora = idCancion;
	},
	setTiempoTotalServer(state, tiempo) {
		state.tiempoTotalServer = parseInt(tiempo);
	},
	setTiempoTranscurridoServer(state, tiempo) {
		state.tiempoTranscurridoServer = parseInt(tiempo);
	},
	setCurrentPlayingDispositivoId(state, dispositivo_id) {
		state.currentPlayingDispositivoId = parseInt(dispositivo_id);
	},

	setMySongIsPlaying(state, value) {
		state.mySongIsPlaying = value;
	},









	// New kids on the block

	setTotal(state, val) {
		state.total = val;
	},

	setTranscurrido(state, val) {
		state.transcurrido = val;
	},

	setRestante(state, val) {
		state.restante = val;
	},

	setIntervaloSegundos(state, val) {
		state.intervaloSegundos = val;
	}



};









function getTiempoFormateado(segundos) {
	var tiempo = new Date(null);
	tiempo.setSeconds(segundos);
	return tiempo.toISOString().substr(14, 5);	
};





// var moco = setInterval(this.songStatus, 3000);
// var moco = setInterval(() => {
// 	console.log("fefefefe", rootState);
// 	actions.songStatus();
// }, 5000);






export default {
	state,
	getters,
	actions,
	mutations,
}
