<template>
  <div class="modal" :style="styleVisibleModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modal.hide()"></button>
  </div>
  <section class="section">
    <div class="container">
      <NavBar/>
      <router-view/>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import NavBar from './NavBar.vue'
import {useModal} from './composable/useModal'
export default defineComponent({
  components: {
    NavBar,
  },
  name: 'App',
  setup() {
    const modal = useModal()
    const styleVisibleModal =
        computed(() => ({display: modal.visible.value ? 'block' : 'none'}))
    return {
      modal,
      styleVisibleModal,
    }
  }
})
</script>

