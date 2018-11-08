import Vue from 'vue';
import $ from 'jquery-ajax';
import _ from 'lodash';
import { BASE_URL, ID_SUCURSAL } from '../../api/rocola';

const state = {
	// artistaAhora: " ",
	artistaAhoraServer: " ",
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
	artistaAhora: state => state.artistaAhora,
	cancionAhora: state => state.cancionAhora,
	idCancionAhora: state => state.idCancionAhora,
	tiempoTotal: state => state.tiempoTotal,
	tiempoTranscurrido: state => state.tiempoTranscurrido,
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
				commit('setArtistaAhora', info.artista);
				commit('setCancionAhora', info.titulo_cancion);
				commit('setIdCancionAhora', info.cancion_id);
				commit('setTiempoTotal', info.tiempo_total);
				commit('setTiempoTranscurrido', info.tiempo_transcurrido);

				if(parseInt(info.cancion_id) === rootGetters.cancionPedida) {
					commit('setMySongIsPlaying', true);
				} else {
					if(state.mySongIsPlaying) {
						commit('setMySongIsPlaying', false);

						console.log("bisogno de cagare!");

						console.log("GGGGGGGGG > ", rootGetters.horaCancionPedida);
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
	setArtistaAhora(state, artista) {
		state.artistaAhora = artista;
	},
	setCancionAhora(state, cancion) {
		state.cancionAhora = cancion;
	},
	setIdCancionAhora(state, idCancion) {
		state.idCancionAhora = idCancion;
	},
	setTiempoTotal(state, tiempo) {
		state.tiempoTotal = parseInt(tiempo);
	},
	setTiempoTranscurrido(state, tiempo) {
		state.tiempoTranscurrido = parseInt(tiempo);
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
