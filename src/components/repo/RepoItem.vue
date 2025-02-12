<script>
import BaseCard from '../UI/BaseCard.vue'

export default {
  name: 'RepoItem',
  components: { BaseCard },
  props: ['repo'],
  data() {
    return {
      pressTimer: null,
    };
  },
  methods: {
    startPress() {
      this.pressTimer = setTimeout(() => {
        this.$emit('long-press', this.repo)
      }, 800)
    },
    cancelPress() {
      clearTimeout(this.pressTimer)
    }
  }
}
</script>

<template>
  <li
      @mousedown="startPress"
      @mouseup="cancelPress"
      @mouseleave="cancelPress"
  >
    <base-card :isHasWiki="repo.has_wiki">
      <header>
        <h3>{{ repo.name }}</h3>
      </header>

      <p>{{ repo.description }}</p>
      <nav>
        <a :href="repo.owner.html_url" target="_blank">{{ repo.owner.login }}</a>
      </nav>
    </base-card>
  </li>
</template>

<style scoped>
li {
  margin: auto;
  max-width: 40rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}
</style>