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
    'lazy': require('../src/Lazy/lazy.vue')
  },

  data: () => ({
    status: 1,
    offset: 0,
    limit: 10,
    store: []
  }),

  methods: {
    getData() {
      return fetch('./data.json')
        .then(res => resPurify(res))
        .then(json => {
          this.store = this.store.concat(json);
          this.offset += json.length;
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
    this.firstGetData();
  }
});
