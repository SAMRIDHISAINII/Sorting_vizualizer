import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import './icons';

// for babel-polyfill
// noinspection ES6UnusedImports
import babelpolyfill from 'babel-polyfill';

// for bootstrap
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

Vue.use(BootstrapVue);

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
