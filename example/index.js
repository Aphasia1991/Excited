Vue.config.debug = true;

new Vue({
  el: 'body',
  components: {
    'load': require('../src/load/load.vue'),
    'lazy': require('../src/lazy/lazy.vue')
  },
  data: () => ({
    loader: 6
  }),
  methods: {
    refresh () {
      console.log(1);
    }
  },
  ready () {
    // setTimeout(() => {
    //   this.loader = 6
    // }, 5000);
  }
})
