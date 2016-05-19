<template>
  <div class="load-wrap"
       v-show="status === 1 || status === 2"
       transition="load"
       :style="{ zIndex: zIndex }"
       @touchmove.stop.prevent>

    <div class="loading-main" v-show="status === 1">
      <div class="loading-icon"></div>
      <div class="loading-bottom"></div>
    </div>

    <div class="error-main" v-if="status === 2">
      <img src="./assets/error.svg"></img>
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
          location.reload(true);
        }
      }
    }
  };
</script>

<style src="./load.css" scoped></style>
