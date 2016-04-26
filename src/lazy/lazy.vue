<template>
  <div class="wrap"
       v-show="status === 'load' || status === 'fail'"
       @click="reload">

    <span class="loading"
          v-show="status === 'load'">
      <img src="./assets/load.svg">
      <span>正在加载...</span>
    </span>

    <span v-show="status === 'fail'">加载失败，点此重新加载</span>

  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: String,
        default: ''
      },

      load: {
        type: Function
      }
    },

    data: () => ({
      timer: null
    }),

    watch: {
      status(val) {
        if (val === 'lock') {
          window.removeEventListener('scroll', this.scrollEvent);
        }
      }
    },

    methods: {
      scrollEvent() {
        if (this.status !== 'ready') return;

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
        if (this.status !== 'fail') return;
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
