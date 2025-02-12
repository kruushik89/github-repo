<template>
  <div id="app">
    <the-header title="GitHub Repos"></the-header>
    <repo-list></repo-list>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader.vue'
import RepoList from '@/components/repo/RepoList.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    RepoList
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}
</style>
