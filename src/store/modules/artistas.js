import axios from 'axios';
import _ from 'lodash';
import {BASE_URL, ID_SUCURSAL} from '../../api/rocola';


// Este guarda las variables
const state = {
	artista: null,
	artistas: null,
	canciones: null,
	cancion: null,
	cancionPedida: null,
};

// Estos dan la información del state
const getters = {
	artista: state => state.artista,
	artistas: state => state.artistas,
	canciones: state => state.canciones,
	cancion: state => state.cancion
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


	pedirCancion({ commit }, idCancion) {
		// alert(idCancion+ID_SUCURSAL+"#");
		axios.post(BASE_URL, {
			params: {
				accion: 'add_to_queue',
            	song_id: idCancion,
            	sucursal_id: ID_SUCURSAL,
			}
		}).then(
			(response) => {console.log(response)},

			(error, bb) =>{alert(error, bb)}
			// console.log("canciones: ", response.data);
			// commit('setCanciones', response.data);
		);
	}
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
}

export default {
	state,
	getters,
	actions,
	mutations,
}
