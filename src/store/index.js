import Vue from 'vue';
import Vuex from 'vuex';
import artistas from './modules/artistas';
import player from './modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		artistas,
		player,
	}
});