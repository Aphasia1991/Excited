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
      }
    },

    data: () => ({
      status: 0, // 0 等待，1 加载中，2 加载失败
      page: 0, // 缓存上次的页码
      timer: null
    }),

    computed: {
      offset: {
        set(newVal) {
          if (newVal === 0) {
            // SPA 清空数据时，恢复默认情况
            this.page = 0;
            window.addEventListener('scroll', this.scrollEvent);
          } else if (newVal - this.page < this.limit) {
            // 响应数少于请求数，移除事件
            window.removeEventListener('scroll', this.scrollEvent);
          } else {
            // 正常情况，缓存页码
            this.page = this.offset;
          }
        }
      }
    },

    methods: {
      load() {
        this.status = 1;
        this.method()
          .then(() => {
            this.status = 0;
          })
          .catch(() => {
            this.status = 2;
          });
      },

      scrollEvent() {
        if (this.status !== 0 || this.offset === 0) return;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          const doc = document.documentElement;
          const offset = doc.offsetHeight - doc.clientHeight - window.pageYOffset;
          if (offset >= 0 && offset < 100) {
            this.load();
          }
        }, 100);
      },

      reload() {
        if (this.status !== 2) return;
        this.load();
      }
    },

    attached() {
      window.addEventListener('scroll', this.scrollEvent);
    },

    detached() {
      window.removeEventListener('scroll', this.scrollEvent);
    }
  };
</script>

<style src="./lazy.css" scoped></style>
