<template>
  <div class="wrap"
       v-show="status === 1 || status === 2"
       @click="reload">

    <span class="loading"
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

      // 起始值
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

      temp: 0, // 缓存页码
      timer: null
    }),

    watch: {
      // 当 SAP 清空数据时，重置状态
      // 当首次（包含外部）加载量不足时，移除事件
      offset(newVal) {
        if (newVal === 0) {
          this.temp = 0;
          this.addEvent();
        } else if (newVal < this.limit) {
          this.rmEvent();
        }
      }
    },

    methods: {
      load() {
        // 请求前同步页码
        this.temp = this.offset;
        this.status = 1;
        this.method()
          .then(() => {
            // 新增量少于请求，移除事件
            if (this.offset - this.temp < this.limit) {
              this.rmEvent();
            }

            window.setTimeout(() => {
              this.status = 0;
            }, 500);
          })
          .catch(() => {
            this.status = 2;
          });
      },

      reload() {
        if (this.status !== 2) return;
        this.load();
      },

      lazyLoad() {
        const doc = document.documentElement;
        const offset = doc.offsetHeight - doc.clientHeight - window.pageYOffset;
        if (offset >= 0 && offset < this.bottom) {
          this.load();
        }
      },

      scrollEvent() {
        if (this.status !== 0 || this.offset === 0) return;

        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(this.lazyLoad, 100);
      },

      addEvent() {
        window.addEventListener('scroll', this.scrollEvent);
      },

      rmEvent() {
        window.removeEventListener('scroll', this.scrollEvent);
      }
    },

    ready() {
      this.addEvent();
    },

    destroyed() {
      this.rmEvent();
    }
  };
</script>

<style src="./lazy.css" scoped></style>
