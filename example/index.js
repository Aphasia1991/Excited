Vue.config.debug = true;

const resPurify = (res) => {
  const json = res.json();
  if (res.status >= 200 && res.status < 300) return json;
  return json.then(Promise.reject.bind(Promise));
};

new Vue({
  el: 'body',

  components: {
    'load': require('../src/Load/load.vue'),
    'lazy': require('../src/Lazy/lazy.vue'),
    'hourglass': require('../src/Hourglass/hourglass.vue')
  },

  data: () => ({
    status: 1,
    limit: 10,
    countdown: 10,
    store: []
  }),

  computed: {
    offset() {
      return this.store.length;
    }
  },

  methods: {
    getData() {
      return fetch('./data.json')
        .then(res => resPurify(res))
        .then(json => {
          this.store = this.store.concat(json);
        });
    },

    firstGetData() {
      this.status = 1;

      this.getData()
        .then(() => {
          this.status = 0;
        })
        .catch(() => {
          this.status = 2;
        });
    }
  },

  ready() {
    // this.firstGetData();
    //
    // setTimeout(() => {
    //   this.store = [];
    //   // this.countdown = -999;
    // }, 10000);
  }
});
