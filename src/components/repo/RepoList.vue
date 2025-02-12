<script>
import { fetchRepos, getSavedRepositories, saveRepositories } from '@/services/repositoryService'
import { getSavedScrollPosition, saveScrollPosition } from '@/services/scrollService'

import RepoItem from './RepoItem.vue'
import BaseDialog from '../UI/BaseDialog.vue'
import TheLoading from '../UI/TheLoading.vue'
import { debounce } from '@/util'

export default {
  name: 'RepoList',
  components: {
    TheLoading,
    RepoItem,
    BaseDialog
  },
  data() {
    return {
      repositories: [],
      page: 1,
      loading: false,
      dialogVisible: false,
      selectedRepo: null
    }
  },
  async mounted() {
    const savedRepos = getSavedRepositories()

    if (savedRepos.length > 0) {
      this.repositories = savedRepos
      this.page = Math.floor(this.repositories.length / 10) + 1
    } else {
      await this.loadRepositories()
    }

    this.$nextTick(() => {
      this.restoreScrollPosition()
    })
  },
  methods: {
    async loadRepositories() {
      if (this.loading) return

      if (this.repositories.length === 0) {
        this.loading = true
      }

      try {
        const newRepos = await fetchRepos(this.page)
        this.repositories = [...this.repositories, ...newRepos]
        this.page++
        saveRepositories(this.repositories)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async restoreScrollPosition() {
      const container = this.$refs.scrollContainer
      const savedPosition = getSavedScrollPosition()

      while (
          container.scrollHeight < savedPosition + container.clientHeight &&
          !this.loading
          ) {
        await this.loadRepositories()
        await this.$nextTick()
      }
      container.scrollTop = savedPosition
    },
    handleScroll() {
      const container = this.$refs.scrollContainer

      saveScrollPosition(container.scrollTop)

      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        this.loadRepositories()
      }
    },
    openDialog(repo) {
      this.selectedRepo = repo
      this.dialogVisible = true
    },
    closeDialog() {
      this.selectedRepo = null
      this.dialogVisible = false
    }
  },
  created() {
    this.handleScroll = debounce(this.handleScroll, 200)
  }
}
</script>

<template>
  <ul class="repo-list" ref="scrollContainer" @scroll="handleScroll">
    <repo-item
        v-for="repo in repositories"
        :key="repo.id"
        :repo="repo"
        @long-press="openDialog"
    ></repo-item>
    <the-loading v-if="loading"></the-loading>
  </ul>
  <base-dialog
      v-if="dialogVisible"
      title="Open Link"
      @close="closeDialog"
  >
    <template #default>
      <p>
        Would you like to visit the repository
        <a target="_blank" :href="selectedRepo.html_url">page</a> or
        <a target="_blank" :href="selectedRepo.owner.html_url">the owner's profile</a> on GitHub?
      </p>
    </template>
  </base-dialog>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: auto;
  height: calc(100vh - 80px);
  overflow-y: auto;
}
</style>
