<template>
  <div class="wrap"
       v-show="status === 4 || status === 5"
       @click="reload">
    <span class="loading"
          v-show="status === 4">
      <img src="./assets/load.svg">
      <span>正在加载...</span>
    </span>

    <span v-show="status === 5">加载失败，点此重新加载</span>
  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: Number,
        default: 3 // 3 空闲，4 加载中，5 失败
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
        if (this.status !== 3) return;

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
        if (this.status !== 5) return;
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
