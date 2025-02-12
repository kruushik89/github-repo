<script>
export default {
  name: 'TheLoading'
}
</script>

<template>
  <div>
    Loading...
  </div>
</template>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  z-index: 100;
}
</style>