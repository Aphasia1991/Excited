<template>
  <div class="load-wrap"
       v-show="status === 1 || status === 2"
       :style="{ zIndex: zIndex }"
       @touchmove.stop.prevent="touch"
       transition="load">

    <div class="loading-main"
         v-show="status === 1">
      <div class="loading-icon-wrap">
        <div class="loading-icon"></div>
      </div>
      <div class="loading-bottom"></div>
    </div>

    <div class="error-main"
         v-if="status === 2">
      <img src="./assets/error.png"></img>
      <h2>加载失败了</h2>
      <a @click="method">重新加载</a>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: Number,
        default: 0 // 0 不显示，1 加载中，2 失败
      },
      zIndex: {
        type: Number,
        default: 8888
      },
      method: {
        type: Function,
        default() {
          window.location.reload(true);
        }
      }
    },

    methods: {
      touch() {
        return false;
      }
    }
  };
</script>

<style src="./load.css" scoped></style>
