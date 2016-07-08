<script>
  // 包装 fetch API
  const $fetch = (url) => fetch(url)
    .then(res => {
      const json = res.json();
      if (res.status >= 200 && res.status < 300) return json;
      return json.then(Promise.reject.bind(Promise));
    });

  export default {
    props: {
      timeout: {
        type: Number,
        default: 5000
      },

      apihost: {
        type: String,
        default: '//m.ele.me/restapi'
      },

      show: {
        type: Boolean,
        default: true
      },

      tips: {
        type: Object,
        default: () => ({
          loading: '正在定位，请稍后...',
          failed: '定位失败，点此重新定位',
          fallback: '您附近的餐厅'
        })
      },

      resolve: {
        type: Function,
        default() {}
      },

      reject: {
        type: Function,
        default() {}
      }
    },

    data: () => ({
      geohash: '',
      locName: '',

      navHash: '',
      apiHash: '',
      apiLock: false,
      isTrying: null // interval ID
    }),

    computed: {
      locTips() {
        return this.isTrying ? this.tips.loading : this.tips.failed;
      }
    },

    watch: {
      // 一旦获取到 geohash，清空计时器，执行 resolve，获取地址名
      geohash(val) {
        if (!val) return;
        clearTimeout(this.isTrying);

        this.resolve(val);
        this.getLocName();
      }
    },

    methods: {
      // 获取地址名称
      getLocName() {
        if (!this.show) return;

        $fetch(this.apihost + '/v2/pois/' + this.geohash)
          .then(json => {
            this.locName = json.name;
          })
          .catch(() => {
            this.locName = this.tips.fallback;
          });
      },

      // 获取 restAPI 地址
      getApiHash() {
        if (this.apiLock) return;
        this.apiLock = true;

        $fetch(this.apihost + '/v1/cities?type=guess')
          .then(json => {
            this.apiHash = Geohash.encode(json.latitude, json.longitude);
          })
          .catch(() => {
            this.apiLock = false;
          });
      },

      // 获取浏览器地址
      getNavigatorHash() {
        if (!navigator.geolocation || this.navHash) return;

        navigator.geolocation.getCurrentPosition(position => {
          this.navHash = Geohash.encode(position.coords.latitude, position.coords.longitude);
        });
      },

      // 获取 App 地址
      getHybridHash() {
        hybridAPI.getGlobalGeohash(geohash => {
          this.geohash = geohash;
        });
      },

      // 选择最佳结果：Hybrid API > Navigator > restAPI
      selectBestLoc() {
        clearTimeout(this.isTrying);
        this.isTrying = null;

        if (this.geohash) return;
        if (this.navHash) return this.geohash = this.navHash;
        if (this.apiHash) return this.geohash = this.apiHash;

        this.reject();
      },

      // 每隔 500 毫秒请求一次 Hybrid API 数据
      // Hybird API 有坑，回调函数必然执行，但未取得时参数为空
      loopTryHybrid() {
        if (this.geohash || this.isTrying) return;

        this.isTrying = setInterval(this.getHybridHash, 500);
        setTimeout(this.selectBestLoc, this.timeout);
      },

      // App 内部取地址模式
      useAppMode() {
        const fallback = () => {
          if (this.geohash) return;
          this.getNavigatorHash();
          this.getApiHash();
        };

        this.getHybridHash();
        this.loopTryHybrid();

        setTimeout(fallback, this.timeout / 2);
      },

      // 外部取地址模式
      useExternalMode() {
        this.isTrying = setTimeout(this.selectBestLoc, this.timeout);

        this.getNavigatorHash();
        this.getApiHash();
        this.$watch('navHash', val => {
          this.geohash = val;
        });
      },

      // 选择模式
      getUserLoc() {
        if (this.geohash) return;
        if (/Eleme/i.test(navigator.userAgent)) return this.useAppMode();
        this.useExternalMode();
      }
    },

    events: {
      initCompass(geohash) {
        if (geohash) return this.geohash = geohash;
        this.getUserLoc();
      }
    }
  };
</script>

<template>
  <div class="compass-wrap" v-show="show" @click="getUserLoc">
    <svg class="compass-location" v-if="geohash"
      viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 7.405c-10.856 0-19.657 8.8-19.657 19.657 0 10.858 15.405 27.472 15.405 27.472 2.348 2.743 6.193 2.758 8.518-.013 0 0 15.392-16.6 15.392-27.457 0-10.858-8.8-19.658-19.658-19.658zm0 28.123a9.092 9.092 0 0 1-9.094-9.094c0-5.02 4.07-9.092 9.094-9.092a9.093 9.093 0 1 1 0 18.186z" fill-rule="evenodd"/></svg>
    <svg class="compass-refresh" :class="[ isTrying ? 'compass-loading': '' ]" v-else
      viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M52.255 32.99c.016-.335.025-.67.025-1.008C52.28 20.78 43.2 11.7 32 11.7a20.172 20.172 0 0 0-10.638 3.015 2.34 2.34 0 1 0 2.45 3.98A15.527 15.527 0 0 1 32 16.373c8.62 0 15.607 6.99 15.607 15.61 0 .337-.012.673-.034 1.008h-4.537l6.982 10 6.982-10h-4.745zM41.532 44.885c-.5 0-.964.155-1.344.423A15.527 15.527 0 0 1 32 47.63c-8.62 0-15.607-6.99-15.607-15.61 0-.34.012-.676.034-1.01h4.537l-6.982-9.998L7 31.01h4.745c-.016.335-.025.67-.025 1.008C11.72 43.22 20.8 52.3 32 52.3a20.17 20.17 0 0 0 10.64-3.015 2.34 2.34 0 0 0-1.107-4.404v.004z" fill-rule="evenodd"/></svg>

    <span class="compass-name" v-if="geohash">{{ locName }}</span>
    <span class="compass-tips" v-else>{{ locTips }}</span>
  </div>
</template>

<style src="./compass.css"></style>
