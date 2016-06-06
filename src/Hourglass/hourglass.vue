<template>
  <div>
    <span v-if="onlyDay">{{ sundial }}</span>

    <div v-else>
      <span>{{ hourglass[0] }}</span>
      <span>{{ hourglass[1] }}</span>
      <span>{{ hourglass[2] }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      countdown: {
        type: Number,
        default: 0
      },

      // 只显示天数
      onlyDay: {
        type: Boolean,
        default: false
      },

      method: {
        type: Function,
        default() {}
      }
    },

    watch: {
      countdown(newVal) {
        if (newVal > 0) {
          this.setTimer();
        } else {
          this.triggerMethod();
        }
      }
    },

    data: () => ({
      timer: 0,
      interval: null
    }),

    computed: {
      sundial() {
        if (!this.onlyDay) return;
        return Math.ceil(this.timer / 86400);
      },

      hourglass() {
        if (this.onlyDay) return;

        const hour = Math.floor(this.timer / 3600);
        const min = Math.floor(this.timer % 3600 / 60);
        const sec = this.timer % 60;
        const format = num => num < 10 ? '0' + num : num;

        return [format(hour), format(min), format(sec)];
      }
    },

    methods: {
      clearInter() {
        clearInterval(this.interval);
      },

      setTimer() {
        this.clearInter();

        this.timer = this.countdown;

        this.interval = setInterval(() => {
          if (this.timer > 1) {
            this.timer -= 1;
          } else {
            this.triggerMethod();
          }
        }, 1000);
      },

      triggerMethod() {
        this.clearInter();
        this.timer = 0;
        this.method();
      }
    },

    ready() {
      if (this.countdown > 0) {
        this.setTimer();
      }
    }
  };
</script>
