import Vue from 'vue';
import $ from 'jquery-ajax';
import _ from 'lodash';
import { BASE_URL, ID_SUCURSAL } from '../../api/rocola';


const state = {
	artistaAhora: " ",
	cancionAhora: " ",
	tiempoTotal: 0,
	tiempoTranscurrido: 0,
	porcentaje: 0,
	mySongIsPlaying: false,
	currentPlayingDispositivoId: null,
};


const getters = {
	artistaAhora: state => state.artistaAhora,
	cancionAhora: state => state.cancionAhora,
	tiempoTotal: state => state.tiempoTotal,
	tiempoTranscurrido: state => state.tiempoTranscurrido,
	currentPlayingDispositivoId: state => state.currentPlayingDispositivoId,
	mySongIsPlaying: state => state.mySongIsPlaying
};


const actions = {

	getPlayerVars({ commit, dispatch }) {
		
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
				commit('setTiempoTotal', info.tiempo_total);
				commit('setTiempoTranscurrido', info.tiempo_transcurrido);
				// commit('setCurrentPlayingDispositivoId', info.dispositivo_id);
				console.log(info);
				console.log("PERO QUÉ MIERDA!", info.dispositivoId, " vs ", state.dispositivo_id);
				
				if(info.dispositivoId === state.dispositivo_id) {
					dispatch('setMySongIsPlaying', true);
				} else {
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
