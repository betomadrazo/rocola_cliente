import Vue from 'vue';
import axios from 'axios';
import $ from 'jquery-ajax';
import _ from 'lodash';
import {BASE_URL, ID_SUCURSAL} from '../../api/rocola';


// Este guarda las variables
const state = {
	artista: null,
	artistas: null,
	canciones: null,
	cancion: null,

	cancionPedida: null,

	cancionesEnCola: null,
	segundosFaltantesEnCola: null,
	segundosFaltantesEnCancion: null,
};

// Estos dan la información del state
const getters = {
	artista: state => state.artista,
	artistas: state => state.artistas,
	canciones: state => state.canciones,
	cancion: state => state.cancion,

	cancionesEnCola: state => state.cancionesEnCola,
	cancionPedida: state => state.cancionPedida,

	segundosFaltantesEnCola: state => state.segundosFaltantesEnCola,
	segundosFaltantesEnCancion: state => state.segundosFaltantesEnCancion,
};

// Estas realizan funciones y llaman a mutations
const actions = {
	getArtistas({ commit }) {
		axios.get(BASE_URL, {
			params: {
				accion: 'get_artistas_activos',
			}
		}).then(response => {
			commit('setArtistas', response.data);
		});
	},

	setArtista({ commit }, idArtista) {
		var artistilla = _.keyBy(state.artistas, 'id_artista')[idArtista];
		commit('setArtista', artistilla);

		axios.get(BASE_URL, {
			params: {
				accion: 'get_canciones_de_artista_activo',
				id_artista: idArtista,
			}
		}).then(response => {
			console.log("canciones: ", response.data);
			commit('setCanciones', response.data);
		});
	},

	setCancion({ commit }, idCancion) {
		var cancioncilla = _.keyBy(state.canciones, 'id_cancion')[idCancion];
		console.log(cancioncilla);
		commit('setCancion', cancioncilla);
	},

	getCancionesEnCola({ commit }) {
		axios.get(BASE_URL, {
			params: {
				accion: 'get_queue_from_server2',
				sucursal_id: ID_SUCURSAL,
			}
		}).then(response => {
			var horas, minutos, segundos;
			var segundosFaltantesEnCola = 0;
			for(var c of response.data) {
				if(c.hasOwnProperty('duracion')) {
					console.log(c.duracion);
					var tiempo = c.duracion.split(':');

					// switch(tiempo.length) {
					// 	case 3:
					// 	horas = parseInt(tiempo[0], 10) * 60 * 60;
					// 	case 2:
					// 	minutos = parseInt(tiempo[0], 10) * 60;
					// 	case 1:
					// 	segundos = parseInt(tiempo[1], 10);
					// }

					if(tiempo.length === 2) {
						var segs = (parseInt(tiempo[0], 10) * 60) + (parseInt(tiempo[1], 10));
						segundosFaltantesEnCola += segs;
					}
					console.log(segs);
				}
			}

			commit('setSegundosFaltantesEnCola', segundosFaltantesEnCola);
			commit('setCancionesEnCola', response.data);
		});
	},

	pedirCancion({ commit, dispatch }, idCancion) {
		$.ajax({
			url: BASE_URL,
			type: 'POST',
			dataType: 'json',
			data: {
				'accion': 'add_to_queue',
				'song_id': idCancion,
				sucursal_id: ID_SUCURSAL
			},
			success: function(response) {
				console.log(response);
				commit('setCancionPedida', idCancion);
				dispatch('getCancionesEnCola');
			},
			error: function(response, err) {
				console.log(response, err);
			}
		}); 
	},

	getSegundosFaltantesEnCola({ commit }, segundos) {
		commit('setSegundosFaltantesEnCola', segundos);
	},

	setSegundosFaltantesEnCancion({ commit }, segundos) {
		commit('setSegundosFaltantesEnCancion', segundos);
	},
};

// Estas cambian el state
const mutations = {
	setArtistas(state, artistas) {
		state.artistas = artistas;
	},

	setArtista(state, artista) {
		state.artista = artista;
	},

	setCanciones(state, canciones) {
		state.canciones = canciones;
	},

	setCancion(state, cancion) {
		state.cancion = cancion;
	},

	setCancionesEnCola(state, canciones) {
		state.cancionesEnCola = canciones;
	},

	setCancionPedida(state, status) {
		state.cancionPedida = status;
	},

	setSegundosFaltantesEnCola(state, segundos) {
		state.segundosFaltantesEnCola = segundos;
	},

	setSegundosFaltantesEnCancion(state, segundos) {
		state.segundosFaltantesEnCancion = segundos;
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
