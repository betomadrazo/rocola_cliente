import api from '../../api/rocola';


// Este guarda las variables
const state = {
	artistas: null,
	cancionPedida: null,
	sayHi: 'Hello!',
};

// Estos dan la información del state
const getters = {

};

// Estas realizan funciones y llaman a mutations
const actions = {
	greet() {
		alert(state.sayHi);
	}
};

// Estas cambian el state
const mutations = {

}

export default {
	state,
	getters,
	actions,
	mutations,
}