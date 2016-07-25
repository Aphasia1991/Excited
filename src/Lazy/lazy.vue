<script>
  export default {
    props: {
      // 触发函数 [必须返回 Promise]
      method: Function,

      // 当前页码
      offset: {
        type: Number,
        default: 0
      },

      // 查询数
      limit: {
        type: Number,
        default: 10
      },

      // 触发坐标
      bottom: {
        type: Number,
        default: 300
      },

      tips: {
        type: Object,
        default: () => ({
          'waiting': '',
          'loading': '正在加载...',
          'error': '加载失败，点此重新加载',
          'done': '没有更多了哦~'
        })
      }
    },

    data: () => ({
      status: 'waiting', // waiting loading error done
      offsetTemp: 0, // 缓存页码
      scrollTimer: null, // 定时器
      flagElement: window // 滚动元素
    }),

    computed: {
      renderText() {
        return this.tips[this.status];
      }
    },

    methods: {
      loadData() {
        // 请求前同步页码
        this.offsetTemp = this.offset;
        this.status = 'loading';
        this.method()
          .then(() => {
            setTimeout(() => {
              if (this.offset - this.offsetTemp < this.limit) return this.rmEvent();
              this.status = 'waiting';
            }, 500);
          })
          .catch(() => {
            this.status = 'error';
          });
      },

      lazyLoadData() {
        const element = this.flagElement === window ? document.documentElement : this.flagElement;
        const distance = element.offsetHeight - element.clientHeight - this.getScrollTop();

        if (distance < this.bottom) this.loadData();
      },

      reloadEvent() {
        if (this.status === 'error') this.loadData();
      },

      scrollEvent() {
        // 有时浏览器不能及时移除事件
        if (this.status !== 'waiting' || this.offset < this.limit) return;

        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(this.lazyLoadData, 100);
      },

      addEvent() {
        this.status = 'waiting';
        this.flagElement.addEventListener('scroll', this.scrollEvent);
      },

      rmEvent() {
        this.flagElement.removeEventListener('scroll', this.scrollEvent);
        this.status = 'done';
      },

      getScrollTop() {
        return this.flagElement === window ? window.pageYOffset : this.flagElement.scrollTop;
      },

      getLazyFlag() {
        const isScrollNode = el => el.tagName !== 'HTML' && el.tagName !== 'BODY' && el.nodeType === 1;
        const isFlag = el => typeof el.getAttribute('lazy-flag') === 'string';
        let lazyFlag = this.$el.parentNode;

        while (isScrollNode(lazyFlag)) {
          if (isFlag(lazyFlag)) return lazyFlag;
          lazyFlag = lazyFlag.parentNode;
        }

        return window;
      },

      offsetWatcher() {
        if (this.offset === 0) {
          this.rmEvent();
          return this.status = 'waiting';
        }
        if (this.offset === this.limit) return this.addEvent();
        if (this.offset < this.limit) return this.rmEvent();
      }
    },

    watch: {
      offset() {
        this.offsetWatcher();
      }
    },

    ready() {
      this.flagElement = this.getLazyFlag();
      this.offsetWatcher();
    },

    destroyed() {
      this.rmEvent();
    },

    events: {
      initLazy() {
        if (this.offset === 0) this.loadData();
      }
    }
  };
</script>

<template>
  <div class="lazy-wrap" v-show="renderText" @click="reloadEvent">
    <img src="./assets/load.svg" v-show="status === 'loading'">
    <span class="lazy-text">{{ renderText }}</span>
  </div>
</template>

<style src="./lazy.css" scoped></style>
