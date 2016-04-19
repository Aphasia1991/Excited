import load from '../src/load/load.vue';

Vue.config.debug = true;

new Vue({
  el: 'body',
  components: {
    'load': load
  },
  data: () => ({
    loader: 1
  }),
  methods: {
    refresh () {
      this.loader = 1
    }
  },
  ready () {
    setTimeout(() => {
      this.loader = 2
    }, 5000)
  }
})
