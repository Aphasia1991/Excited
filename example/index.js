Vue.config.debug = true;

const $fetch = url => fetch(url)
  .then(res => {
    const json = res.json();
    if (res.status >= 200 && res.status < 300) return json;
    return json.then(Promise.reject.bind(Promise));
  });

new Vue({
  el: 'body',

  components: {
    'load': require('../src/Load/load.vue'),
    'lazy': require('../src/Lazy/lazy.vue'),
    'hourglass': require('../src/Hourglass/hourglass.vue'),
    'compass': require('../src/Compass/compass.vue'),
    'board': require('../src/Board/board.vue')
  },

  data: () => ({
    status: 2,
    limit: 10,
    countdown: 10,
    store: [],
    boards: [{
      title: '活动时间',
      content: '2016年1月1日-2017年1月1日'
    }, {
      title: '活动规则',
      content: ['这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊', '这是什么这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊这是什么东西啊什么东西啊']
    }],
    beacon: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }),

  computed: {
    offset() {
      return this.store.length;
    }
  },

  methods: {
    getData() {
      return $fetch('./data.json')
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
    },

    timeUp() {
      console.log('Time Up!');
    },

    initStage(val) {
      console.log(val);
    }
  },

  ready() {
    // this.firstGetData();
    this.$broadcast('initLazy');

    setTimeout(() => {
      // this.store = [];
      this.countdown = -9999;
    }, 5000);
  }
});
