<template>
  <div class="navbar">
    <div class="navbar-end">
      <router-link class="button" to="/posts/new">new post</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'NavBar',
})
</script>

