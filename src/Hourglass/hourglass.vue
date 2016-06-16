<template>
  <div>
    <span v-if="start === 0" v-text="day"></span>
    <span v-if="start <= 1 && end >= 1" v-text="hour"></span>
    <span v-if="start <= 2 && end >= 2" v-text="min"></span>
    <span v-if="end === 3" v-text="sec"></span>
  </div>
</template>

<script>
  export default {
    props: {
      countdown: {
        type: Number,
        default: -1
      },

      start: {
        type: Number,
        default: 1
      },

      end: {
        type: Number,
        default: 3
      },

      fill: {
        type: Boolean,
        default: true
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
      day() {
        return this.getNumber(0, 31536000, 86400);
      },

      hour() {
        return this.getNumber(1, 86400, 3600);
      },

      min() {
        return this.getNumber(2, 3600, 60);
      },

      sec() {
        return this.getNumber(3, 60, 1);
      }
    },

    methods: {
      formatNum(num) {
        if (!this.fill) return num;

        return num < 10 ? '0' + num : num;
      },

      getNumber(index, parentNum, selfNum) {
        const mathFn = this.end === index ? 'ceil' : 'floor';
        const baseNum = this.start < index
          ? this.timer % parentNum / selfNum
          : this.timer / selfNum;

        return this.formatNum(Math[mathFn](baseNum));
      },

      clearInter() {
        clearInterval(this.interval);
      },

      setTimer() {
        this.clearInter();

        this.timer = this.countdown;

        this.interval = setInterval(() => {
          if (this.timer > 1) {
            this.timer--;
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
