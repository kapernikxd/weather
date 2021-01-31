import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    cities: [
      // { name: "Казань", index: 0 },
    ],
  },
  mutations: {
    ADD_CITY (state, payload) {
      state.cities = [
        ...state.cities,
        payload
      ]
    },

    DELETE_CITY(state, payload){
      state.cities = payload
    },

    MOVED_CITY(state, payload){
      state.cities = payload
    },

    LOCAL_STORAGE(state, payload){
      state.cities = payload
    }
  },
  actions: {

    addCity({commit}, payload){
        commit('ADD_CITY', payload)
        localStorage.setItem("cities", JSON.stringify(this.state.cities));
    },

    deleteCity({commit}, payload){
        commit('DELETE_CITY', payload)
        localStorage.setItem("cities", JSON.stringify(this.state.cities));
    },

    moved({commit}, payload){
      commit('MOVED_CITY', payload)
      localStorage.setItem("cities", JSON.stringify(this.state.cities));
    },

    addFromLocalStore({commit}, payload){
      commit('LOCAL_STORAGE', payload)
    },

  },
  modules: {
  }
})
