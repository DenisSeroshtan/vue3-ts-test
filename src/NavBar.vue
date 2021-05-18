<template>
  <div class="navbar">
    <div class="navbar-end">
      <button class="button" @click="modal.show()">sign up</button>
      <router-link class="button" to="/posts/new">new post</router-link>
    </div>
  </div>
  <teleport to="#modal" v-if="modal.visible"> test modal</teleport>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useModal} from './composable/useModal'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const modal = useModal()

    return {
      modal
    }
  }
})
</script>

