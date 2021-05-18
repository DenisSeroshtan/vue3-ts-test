<template>
  <div class="modal" :style="styleVisibleModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modal.hide()"></button>
  </div>
  <section class="section">
    <FormInput v-model="valueUserName" name="username" label="username"></FormInput>
    {{ valueUserName }}
    <div class="container">
      <NavBar/>
      <router-view/>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import NavBar from './NavBar.vue'
import FormInput from './FormInput.vue'
import {useModal} from './composable/useModal'
export default defineComponent({
  components: {
    NavBar,
    FormInput,
  },
  name: 'App',
  setup() {
    const modal = useModal()
    const valueUserName = ref('')
    const styleVisibleModal =
        computed(() => ({display: modal.visible.value ? 'block' : 'none'}))
    return {
      modal,
      styleVisibleModal,
      valueUserName,
    }
  }
})
</script>

