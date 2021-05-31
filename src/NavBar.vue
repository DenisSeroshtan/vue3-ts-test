<template>
  <div class="navbar">
    <div class="navbar-end">
      <button class="button" @click="modal.show()">sign up</button>
      <router-link class="button" to="/posts/new">new post</router-link>
    </div>
  </div>
  <teleport to="#modal" v-if="modal.visible"> <SignUp></SignUp></teleport>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useModal} from './composable/useModal'
import SignUp from './SignUp.vue'
import FormInput from "./FormInput.vue";

export default defineComponent({
  name: 'NavBar',
  components: {SignUp},
  setup() {
    const modal = useModal()

    return {
      modal
    }
  }
})
</script>

