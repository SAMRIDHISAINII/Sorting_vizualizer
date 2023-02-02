import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const headers = {
  'content-type': 'application/x-www-form-urlencoded',
  'Accept-Encoding': 'application/gzip',
  'X-RapidAPI-Key': '6bfed0b588mshe2ece70985e9f9fp10e5aajsnf638a2326ae2',
  'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
};

export default new Vuex.Store({
  state: {
    language: '',
    loading: false
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    detectLanguage({ commit }, text) {
      commit('setLoading', true);
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", text);
      axios
        .post(
          'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
          encodedParams,
          { headers }
        )
        .then(response => {
          commit('setLanguage', response.data.data.detections[0][0].language);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    }
  }
});
