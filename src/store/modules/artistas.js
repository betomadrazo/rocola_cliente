import axios from 'axios';

import BASE_URL from '../../api/rocola';


// Este guarda las variables
const state = {
	id_artista: null,
	artistas: null,
	cancionPedida: null,
	canciones: null
};

// Estos dan la información del state
const getters = {
	artistas: state => state.artistas,
	canciones: state => state.canciones
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
		console.log(idArtista);
		axios.get(BASE_URL, {
			params: {
				accion: 'get_canciones_de_artista_activo',
				id_artista: idArtista,
			}
		}).then(response => {
			console.log("canciones: ", response.data);
			commit('setCanciones', response.data);
		});
	}
};

// Estas cambian el state
const mutations = {
	setArtistas(state, artistas) {
		state.artistas = artistas;
	},
	setCanciones(state, canciones) {
		state.canciones = canciones;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}