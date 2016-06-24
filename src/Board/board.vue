<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },

      content: [String, Array]
    },

    computed: {
      typo() {
        return Array.isArray(this.content) ? 'list' : 'line';
      }
    }
  };
</script>

<template>
  <div class="board-wrap" :class="[ 'board-' + typo ]">
    <h3>{{ title }}</h3><span v-if="typo === 'line'">{{ content }}</span>

    <ul v-if="typo === 'list'">
      <li v-for="item in content">{{ item }}</li>
    </ul>
  </div>
</template>

<style src="./board.css"></style>
