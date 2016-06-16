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
      countdown() {
        this.init();
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

      triggerMethod() {
        clearInterval(this.interval);
        this.timer = 0;
        this.method();
      },

      init() {
        // Fix prop type check
        if (typeof this.countdown !== 'number' || this.countdown < 0) return;

        clearInterval(this.interval);
        this.timer = this.countdown;

        if (this.timer === 0) return this.triggerMethod();

        const hourglass = () => {
          this.timer--;
          if (this.timer === 0) return this.triggerMethod();
        };

        this.interval = setInterval(hourglass, 1000);
      }
    },

    ready() {
      this.init();
    }
  };
</script>

<template>
  <div>
    <span v-if="start === 0" v-text="day"></span>
    <span v-if="start <= 1 && end >= 1" v-text="hour"></span>
    <span v-if="start <= 2 && end >= 2" v-text="min"></span>
    <span v-if="end === 3" v-text="sec"></span>
  </div>
</template>
