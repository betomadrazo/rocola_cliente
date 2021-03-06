import Vue from 'vue'
// import axios from 'axios';
import $ from 'jquery-ajax'
// import _ from 'lodash';
import keyBy from 'lodash.keyby'
import { BASE_URL, ID_SUCURSAL } from '../../api/rocola'

// Este guarda las variables
const state = {
  artista: null,
  artistas: null,
  canciones: null,
  cancion: null,

  cancionPedida: null,
  horaCancionPedida: null,

  cancionesEnCola: null,
  segundosFaltantesEnCola: null,
  segundosFaltantesEnCancion: null,

  puedePedir: true,
  limiteCanciones: 5,

  deviceId: null,

  msgForbidden: '',

  ID_SUCURSAL: null,
}

// Estos dan la información del state
const getters = {
  artista: (state) => state.artista,
  artistas: (state) => state.artistas,
  canciones: (state) => state.canciones,
  cancion: (state) => state.cancion,

  cancionesEnCola: (state) => state.cancionesEnCola,
  cancionPedida: (state) => state.cancionPedida,
  horaCancionPedida: (state) => state.horaCancionPedida,

  segundosFaltantesEnCola: (state) => state.segundosFaltantesEnCola,
  segundosFaltantesEnCancion: (state) => state.segundosFaltantesEnCancion,

  deviceId: (state) => state.deviceId,

  puedePedir: (state) => state.puedePedir,

  limiteCanciones: (state) => state.limiteCanciones,

  msgForbidden: (state) => state.msgForbidden,

  ID_SUCURSAL: (state) => state.ID_SUCURSAL,
}

// Estas realizan funciones y llaman a mutations
const actions = {
  getArtistas({ commit }) {
    $.ajax({
      url: BASE_URL,
      type: 'GET',
      dataType: 'json',
      data: {
        accion: 'get_artistas_activos',
        // id_sucursal: ID_SUCURSAL
        id_sucursal: state.ID_SUCURSAL,
      },
      success: function(response) {
        commit('setArtistas', response)
        // console.log("canciones: ", response);
        // commit('setCanciones', response);
      },
      error: function(response, err) {
        console.log(response, err)
      },
    })
  },

  setArtista({ commit }, idArtista) {
    if (!idArtista) {
      commit('setArtista', null)
      return
    }

    var artistilla = keyBy(state.artistas, 'id_artista')[idArtista]
    commit('setArtista', artistilla)

    $.ajax({
      url: BASE_URL,
      type: 'GET',
      dataType: 'json',
      data: {
        accion: 'get_canciones_de_artista_activo',
        id_artista: idArtista,
        id_sucursal: state.ID_SUCURSAL,
      },
      success: function(response) {
        commit('setCanciones', response)
      },
      error: function(response, err) {
        console.log(response, err)
      },
    })
  },

  setCancion({ commit }, idCancion) {
    // var cancioncilla = _.keyBy(state.canciones, 'id_cancion')[idCancion];
    var cancioncilla = keyBy(state.canciones, 'id_cancion')[idCancion]
    commit('setCancion', cancioncilla)
  },

  // getCancionesEnCola({ commit }) {
  // 	axios.get(BASE_URL, {
  // 		params: {
  // 			accion: 'get_queue_from_server2',
  // 			sucursal_id: ID_SUCURSAL,
  // 		}
  // 	}).then(response => {
  // 		var horas, minutos, segundos;
  // 		var segundosFaltantesEnCola = 0;

  // 		if(response.data.length) {
  // 			for(var c of response.data) {
  // 				if(c.hasOwnProperty('duracion')) {
  // 					var tiempo = c.duracion.split(':');

  // 					if(tiempo.length === 2) {
  // 						if(c.id_cancion !== state.cancionPedida) {
  // 							var segs = (parseInt(tiempo[0], 10) * 60) + (parseInt(tiempo[1], 10));
  // 							segundosFaltantesEnCola += segs;
  // 						}
  // 					}
  // 				}
  // 			}

  // 			commit('setSegundosFaltantesEnCola', segundosFaltantesEnCola);
  // 		}

  // 		commit('setCancionesEnCola', response.data);
  // 	});
  // },

  getCancionesEnCola({ commit }) {
    $.ajax({
      url: BASE_URL,
      data: {
        accion: 'get_queue_from_server2',
        sucursal_id: ID_SUCURSAL,
      },
      success: function(response) {
        var horas, minutos, segundos
        var segundosFaltantesEnCola = 0

        if (response.length) {
          for (var c of response) {
            if (c.hasOwnProperty('duracion')) {
              var tiempo = c.duracion.split(':')

              if (tiempo.length === 2) {
                if (c.id_cancion !== state.cancionPedida) {
                  var segs =
                    parseInt(tiempo[0], 10) * 60 + parseInt(tiempo[1], 10)
                  segundosFaltantesEnCola += segs
                }
              }
            }
          }

          commit('setSegundosFaltantesEnCola', segundosFaltantesEnCola)
        }

        commit('setCancionesEnCola', response)
      },
    })

    // axios.get(BASE_URL, {
    // 	params: {
    // 		accion: 'get_queue_from_server2',
    // 		sucursal_id: ID_SUCURSAL,
    // 	}
    // }).then(response => {
    // 	var horas, minutos, segundos;
    // 	var segundosFaltantesEnCola = 0;

    // 	if(response.data.length) {
    // 		for(var c of response.data) {
    // 			if(c.hasOwnProperty('duracion')) {
    // 				var tiempo = c.duracion.split(':');

    // 				if(tiempo.length === 2) {
    // 					if(c.id_cancion !== state.cancionPedida) {
    // 						var segs = (parseInt(tiempo[0], 10) * 60) + (parseInt(tiempo[1], 10));
    // 						segundosFaltantesEnCola += segs;
    // 					}
    // 				}
    // 			}
    // 		}

    // 		commit('setSegundosFaltantesEnCola', segundosFaltantesEnCola);
    // 	}

    // 	commit('setCancionesEnCola', response.data);
    // });
  },

  getHoraCancionPedida({ commit }, hora) {
    commit('setHoraCancionPedida', hora)
  },

  // getPuedePedir({ commit }) {

  // 	axios.get(BASE_URL, {
  // 		params: {
  // 			accion: 'get_pedir_cancion',
  // 			sucursal_id: ID_SUCURSAL,
  // 			limite_canciones: state.limiteCanciones,
  // 			dispositivo_id: state.deviceId,
  // 		}
  // 	}).then(response => {
  // 		commit('setPuedePedir', response.data.puede_pedir);
  // 		if(!response.data.puede_pedir) {
  // 			commit('setMsgForbidden', `Has alcanzado el límite de ${state.limiteCanciones} canciones al día.`);
  // 		} else {
  // 			commit('setMsgForbidden', `podrás agregar otra canción cuando la que elegiste haya finalizado`);
  // 		}
  // 	});
  // },

  getPuedePedir({ commit }) {
    $.ajax({
      url: BASE_URL,
      data: {
        accion: 'get_pedir_cancion',
        sucursal_id: ID_SUCURSAL,
        limite_canciones: state.limiteCanciones,
        dispositivo_id: state.deviceId,
      },
      success: function(response) {
        commit('setPuedePedir', response.puede_pedir)
        if (!response.puede_pedir) {
          commit(
            'setMsgForbidden',
            `Has alcanzado el límite de ${state.limiteCanciones} canciones al día.`
          )
        } else {
          commit(
            'setMsgForbidden',
            `podrás agregar otra canción cuando la que elegiste haya finalizado`
          )
        }
      },
    })

    // axios.get(BASE_URL, {
    // 	params: {
    // 		accion: 'get_pedir_cancion',
    // 		sucursal_id: ID_SUCURSAL,
    // 		limite_canciones: state.limiteCanciones,
    // 		dispositivo_id: state.deviceId,
    // 	}
    // }).then(response => {
    // 	commit('setPuedePedir', response.data.puede_pedir);
    // 	if(!response.data.puede_pedir) {
    // 		commit('setMsgForbidden', `Has alcanzado el límite de ${state.limiteCanciones} canciones al día.`);
    // 	} else {
    // 		commit('setMsgForbidden', `podrás agregar otra canción cuando la que elegiste haya finalizado`);
    // 	}
    // });
  },

  pedirCancion({ commit, dispatch }, idCancion) {
    var offset = new Date().getTimezoneOffset() * 60000
    var fecha = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    $.ajax({
      url: BASE_URL,
      type: 'POST',
      dataType: 'json',
      data: {
        accion: 'add_to_queue',
        song_id: idCancion,
        sucursal_id: ID_SUCURSAL,
        dispositivo_id: state.deviceId,
        limite_canciones: state.limiteCanciones,
        added_at: fecha,
      },
      success: function(response) {
        commit(
          'setMsgForbidden',
          `podrás agregar otra canción cuando la que elegiste haya finalizado`
        )
        if (response.puede_pedir) {
          commit('setCancionPedida', idCancion)
          commit('setHoraCancionPedida', fecha)
          dispatch('getCancionesEnCola')

          // borra todo lo que tenga que ver con el artista
          commit('setCanciones', null)
          commit('setArtista', null)
        }
      },
      error: function(response, err) {
        console.log(response, err)
      },
    })
  },

  getSegundosFaltantesEnCola({ commit }, segundos) {
    commit('setSegundosFaltantesEnCola', segundos)
  },

  setSegundosFaltantesEnCancion({ commit }, segundos) {
    commit('setSegundosFaltantesEnCancion', segundos)
  },

  setDeviceId({ commit }, hash) {
    commit('setDeviceId', hash)
  },

  setCanciones({ commit }, canciones) {
    commit('setCanciones', canciones)
  },

  // getCancionPedida({ commit, rootState }) {
  // 	axios.get(BASE_URL, {
  // 		params: {
  // 			accion: 'get_cancion_pedida',
  // 			sucursal_id: ID_SUCURSAL,
  // 			dispositivo_id: state.deviceId,
  // 		}
  // 	}).then(response => {
  // 		if(response.data.cancion_pedida) {
  // 			commit('setCancionPedida', response.data.cancion_pedida);
  // 			commit('setHoraCancionPedida', response.data.added_at);
  // 			commit('setMsgForbidden', `podrás agregar otra canción cuando la que elegiste haya finalizado`);

  // 			if(parseInt(rootState.idCancionAhora) === response.data.cancionPedida) {
  // 				commit('setMySongIsPlaying', true, {root: true});
  // 			}
  // 		}
  // 	});
  // },

  getCancionPedida({ commit, rootState }) {
    $.ajax({
      url: BASE_URL,
      data: {
        accion: 'get_cancion_pedida',
        sucursal_id: ID_SUCURSAL,
        dispositivo_id: state.deviceId,
      },
      success: function(response) {
        if (response.cancion_pedida) {
          commit('setCancionPedida', response.cancion_pedida)
          commit('setHoraCancionPedida', response.added_at)
          commit(
            'setMsgForbidden',
            `podrás agregar otra canción cuando la que elegiste haya finalizado`
          )

          if (parseInt(rootState.idCancionAhora) === response.cancionPedida) {
            commit('setMySongIsPlaying', true, { root: true })
          }
        }
      },
    })
    // axios.get(BASE_URL, {
    // 	params: {
    // 		accion: 'get_cancion_pedida',
    // 		sucursal_id: ID_SUCURSAL,
    // 		dispositivo_id: state.deviceId,
    // 	}
    // }).then(response => {
    // 	if(response.data.cancion_pedida) {
    // 		commit('setCancionPedida', response.data.cancion_pedida);
    // 		commit('setHoraCancionPedida', response.data.added_at);
    // 		commit('setMsgForbidden', `podrás agregar otra canción cuando la que elegiste haya finalizado`);

    // 		if(parseInt(rootState.idCancionAhora) === response.data.cancionPedida) {
    // 			commit('setMySongIsPlaying', true, {root: true});
    // 		}
    // 	}
    // });
  },

  getMsgForbidden({ commit }, msg) {
    commit('setMsgForbidden', msg)
  },

  setIDsucursal({ commit }, value) {
    commit('setIDsucursal', value)
  },
}

// Estas cambian el state
const mutations = {
  setArtistas(state, artistas) {
    state.artistas = artistas
  },

  setArtista(state, artista) {
    state.artista = artista
  },

  setCanciones(state, canciones) {
    state.canciones = canciones
  },

  setCancion(state, cancion) {
    state.cancion = cancion
  },

  setCancionesEnCola(state, canciones) {
    state.cancionesEnCola = canciones
  },

  setCancionPedida(state, status) {
    state.cancionPedida = status
  },

  setHoraCancionPedida(state, hora) {
    state.horaCancionPedida = hora
  },

  setSegundosFaltantesEnCola(state, segundos) {
    state.segundosFaltantesEnCola = segundos
  },

  setSegundosFaltantesEnCancion(state, segundos) {
    state.segundosFaltantesEnCancion = segundos
  },

  setDeviceId(state, hash) {
    state.deviceId = hash
  },

  setPuedePedir(state, value) {
    state.puedePedir = value
  },

  setMsgForbidden(state, msg) {
    state.msgForbidden = msg
  },

  setIDsucursal(state, value) {
    state.ID_SUCURSAL = value
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
