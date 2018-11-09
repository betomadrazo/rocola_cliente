import Vue from 'vue';
import $ from 'jquery-ajax';
import _ from 'lodash';
import { BASE_URL, ID_SUCURSAL } from '../../api/rocola';

const state = {
	// artistaAhoraServer: " ",
	artistaAhoraServerServer: " ",
	// cancionAhora: " ",
	cancionAhoraServer: " ",
	idCancionAhora: null,
	// tiempoTotal: 0,
	tiempoTotalServer: 0,
	// tiempoTranscurrido: 0,
	tiempoTranscurridoServer: 0,
	porcentaje: 0,
	mySongIsPlaying: false,
	currentPlayingDispositivoId: null,
};


const getters = {
	artistaAhoraServer: state => state.artistaAhoraServer,
	cancionAhoraServer: state => state.cancionAhoraServer,
	idCancionAhora: state => state.idCancionAhora,
	tiempoTotalServer: state => state.tiempoTotalServer,
	tiempoTranscurridoServer: state => state.tiempoTranscurridoServer,
	currentPlayingDispositivoId: state => state.currentPlayingDispositivoId,
	mySongIsPlaying: state => state.mySongIsPlaying
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
	}
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
		state.tiempoTotal = parseInt(tiempo);
	},
	setTiempoTranscurridoServer(state, tiempo) {
		state.tiempoTranscurridoServer = parseInt(tiempo);
	},
	setCurrentPlayingDispositivoId(state, dispositivo_id) {
		state.currentPlayingDispositivoId = parseInt(dispositivo_id);
	},

	setMySongIsPlaying(state, value) {
		state.mySongIsPlaying = value;
	}
};


export default {
	state,
	getters,
	actions,
	mutations,
}
