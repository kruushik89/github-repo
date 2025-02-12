<script>
export default {
  name: 'TheHeader',
  props: ['title']
}
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #640032;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

header h1 {
  color: white;
  margin: 0;
}
</style>