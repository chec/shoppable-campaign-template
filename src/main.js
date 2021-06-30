import Commerce from '@chec/commerce.js';
import vueSmoothScroll from 'vue2-smooth-scroll';
import Vue from 'vue';
import App from './App.vue';
import Info from './Info.vue';
import router from './router';
import axios from 'axios';

import './styles/index.scss';

Vue.config.productionTip = false;

const debug = process.env.NODE_ENV === 'local' || false;

const commerce = (typeof process.env.VUE_APP_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(process.env.VUE_APP_CHEC_PUBLIC_KEY, debug, {
    url: process.env.VUE_APP_CHEC_API_URL || 'https://api.chec.io',
  })
  : null;

const instance = axios.create({
  headers: { 'X-Authorization': process.env.VUE_APP_CHEC_PUBLIC_KEY },
});

document.addEventListener("DOMContentLoaded", function() {
    let stripe = null, elements = null;
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe(process.env.VUE_APP_STRIPE_API);
        elements = stripe.elements({
        });
    }

  Vue.mixin({
    beforeCreate() {
      this.$stripe = stripe;
      this.$elements = elements;
    },
  });
});

Vue.use(vueSmoothScroll);

Vue.mixin({
  beforeCreate() {
    this.$axios = instance;
    this.$commerce = commerce;
  },
});


new Vue({
  router,
  render: (h) => h((commerce !== null) ? App : Info),
}).$mount('#app');
