<template>
  <div class="lazy-wrap"
       v-show="status === 1 || status === 2"
       @click="reloadHandle">

    <span class="lazy-loading"
          v-show="status === 1">
      <img src="./assets/load.svg">
      <span>正在加载...</span>
    </span>

    <span v-show="status === 2">加载失败，点此重新加载</span>

  </div>
</template>

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
        default: 100
      }
    },

    data: () => ({
      status: 0, // 0 等待，1 加载中，2 加载失败

      offsetTemp: 0, // 缓存页码
      scrollTimer: null, // 定时器
      flagElement: null // 滚动元素
    }),

    watch: {
      offset(newVal) {
        // 当页码增幅达到请求数时，绑定事件
        if (newVal === this.limit) {
          this.addEvent();
        }

        // 当页码增幅小于请求数时，移除事件
        if (newVal < this.limit) {
          this.rmEvent();
        }
      }
    },

    methods: {
      loadData() {
        // 请求前同步页码
        this.offsetTemp = this.offset;
        this.status = 1;
        this.method()
          .then(() => {
            // 新增量少于请求，移除事件
            if (this.offset - this.offsetTemp < this.limit) {
              this.rmEvent();
            }

            // 延迟 500 毫秒重置状态
            window.setTimeout(() => {
              this.status = 0;
            }, 500);
          })
          .catch(() => {
            this.status = 2;
          });
      },

      lazyLoadData() {
        const element = this.flagElement === window ? document.documentElement : this.flagElement;
        const distance = element.offsetHeight - element.clientHeight - this.getScrollTop();

        if (distance < this.bottom) {
          this.loadData();
        }
      },

      reloadHandle() {
        if (this.status !== 2) return;
        this.loadData();
      },

      scrollHandle() {
        // 有时浏览器不能及时移除事件
        if (this.status !== 0 || this.offset < this.limit) return;

        window.clearTimeout(this.scrollTimer);
        this.scrollTimer = window.setTimeout(this.lazyLoadData, 100);
      },

      addEvent() {
        this.flagElement.addEventListener('scroll', this.scrollHandle);
      },

      rmEvent() {
        this.flagElement.removeEventListener('scroll', this.scrollHandle);
      },

      getScrollTop() {
        return this.flagElement === window
          ? Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
          : this.flagElement.scrollTop;
      },

      getLazyFlag() {
        const isScrollNode = el => el.tagName !== 'HTML' && el.tagName !== 'BODY' && el.nodeType === 1;
        const isFlag = el => typeof el.getAttribute('lazy-flag') === 'string';
        let lazyFlag = this.$el.parentNode;

        while (isScrollNode(lazyFlag)) {
          if (isFlag(lazyFlag)) {
            return lazyFlag;
          }

          lazyFlag = lazyFlag.parentNode;
        }

        return window;
      }
    },

    ready() {
      this.flagElement = this.getLazyFlag();
    },

    destroyed() {
      this.rmEvent();
    }
  };
</script>

<style src="./lazy.css" scoped></style>
