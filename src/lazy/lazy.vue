<template>
  <div class="wrap"
       v-show="status === 5 || status === 6"
       @click="reload">
    <span class="loading"
          v-show="status === 5">
      <img src="./assets/load.svg">
      <span>正在加载...</span>
    </span>

    <span v-show="status === 6">加载失败，点此重新加载</span>
  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: Number,
        default: 3 // 3 禁用，4 空闲，5 加载中，6 失败
      },
      load: {
        type: Function
      }
    },

    data: () => ({
      timer: null
    }),

    methods: {
      scrollEvent() {
        if (this.status !== 4) return;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          const doc = document.documentElement;
          const offset = doc.offsetHeight - doc.clientHeight - window.pageYOffset;
          if (offset < 100) {
            this.load();
          }
        }, 100);
      },

      reload() {
        if (this.status !== 6) return;
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
