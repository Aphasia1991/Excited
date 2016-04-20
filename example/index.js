Vue.config.debug = true;

new Vue({
  el: 'body',
  components: {
    'load': require('../src/load/load.vue'),
    'lazy': require('../src/lazy/lazy.vue')
  },
  data: () => ({
    loader: 7
  }),
  methods: {
    refresh () {
      this.loader = 5;
      console.log(111);
    }
  },
  ready () {
    // setTimeout(() => {
    //   this.loader = 6
    // }, 5000);
  }
})
