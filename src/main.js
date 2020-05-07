import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFirestore from 'vue-firestore';
require('firebase/firestore')

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})


Vue.use(VueFirestore)

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import './assets/app.scss';
import 'bootstrap';

import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import store from './store.js';

import Swal from 'sweetalert2';
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
}) 
window.Toast = Toast;

import 'popper.js';
import {fb} from './firebase'
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('products-list', require('./sections/ProductList.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);

Vue.config.productionTip = false;

let app ='';
fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    // User is signed in.
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  } else {
    // No user is signed in.
  }
});

