import Vue from 'vue';
import $ from 'jquery-ajax';
import _ from 'lodash';
import { BASE_URL, ID_SUCURSAL } from '../../api/rocola';


const state = {
	artistaAhora: null,
	cancionAhora: null,
	tiempoTotal: null,
	tiempoTranscurrido: null,
	porcentaje: null,
};


const getters = {
	artistaAhora: state => state.artistaAhora,
	cancionAhora: state => state.cancionAhora,
	tiempoTotal: state => state.tiempoTotal,
	tiempoTranscurrido: state => state.tiempoTranscurrido,
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
	
				console.log("###", info, "###");
	
				commit('setArtistaAhora', info.artista);
				commit('setCancionAhora', info.titulo_cancion);
				commit('setTiempoTotal', info.tiempo_total);
				commit('setTiempoTranscurrido', info.tiempo_transcurrido);

				

			},
			error: function(response, p) {
				console.log("error->", response, p);
			}
		});
	},


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
};


export default {
	state,
	getters,
	actions,
	mutations,
}
