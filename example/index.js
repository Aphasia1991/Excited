Vue.config.debug = true;

new Vue({
  el: 'body',
  components: {
    'load': require('../src/load/load.vue'),
    'lazy': require('../src/lazy/lazy.vue')
  },
  data: () => ({
    loader: 0
  }),
  methods: {
    refresh() {
      this.loader = 1;
    }
  },
  ready() {
    setTimeout(() => {
      this.loader = 1;

      setTimeout(() => {
        this.loader = 0;
      }, 5000);
    }, 5000);
  }
});
