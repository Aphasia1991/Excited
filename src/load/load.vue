<template>
  <div class="wrap"
       v-show="status === 'load' || status === 'fail'"
       transition="wrap">

    <div class="loading-main"
         v-show="status === 'load'">
      <div class="loading-icon-wrap">
        <div class="loading-icon"></div>
      </div>
      <div class="loading-bottom"></div>
    </div>

    <div class="error-main"
         v-if="status === 'fail'">
      <img src="./assets/error.png"></img>
      <h2>加载失败了</h2>
      <a @click="reload">重新加载</a>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      status: {
        type: String,
        default: ''
      },
      reload: {
        type: Function,
        default () {
          window.location.reload(true);
        }
      }
    }
  };
</script>

<style src="./load.css" scoped></style>
