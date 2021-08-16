<template>
  <div class="navbar">
    <div class="buttons" v-if="!auth">
      <button class="button" @click="signup">Signup</button>
      <button class="button" @click="signin">Signin</button>
    </div>
    <div v-else class="navbar-end">
      <button class="button" @click="">sign out</button>
      <router-link class="button" to="/posts/new">new post</router-link>
    </div>

  </div>
  <teleport to="#modal" v-if="modal.visible"> <SignUp></SignUp></teleport>
</template>

<script lang="ts">
import {defineComponent, computed, markRaw} from 'vue'
import {useModal} from './composable/useModal'
import SignUp from './SignUp.vue'
import {useStore} from './store'

export default defineComponent({
  name: 'NavBar',
  components: {SignUp},
  setup() {
    const modal = useModal()
    const store = useStore()
    const auth = computed(() => store.getState().authors.currentUserId)

    const signup = () => {
      modal.component = markRaw(SignUp)
      modal.show()
    }

    const signin = () => {
      modal.show()
    }

    return {
      modal,
      auth,
      signup,
      signin,
    }
  }
})
</script>

