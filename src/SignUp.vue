<template>
  <form @submit.prevent="submit">
    <FormInput v-model="username" name="username" :error="statusUsername.message" label="username"></FormInput>
    <FormInput v-model="password" type="password" :error="statusPassword.message" label="password"></FormInput>
    <button class="button is-primary" :disabled="!statusUsername.valid || !statusPassword.valid">Submit</button>
  </form>
</template>

<script lang="ts">
import FormInput from './FormInput.vue'
import {validate, length, required, Status} from './validators'
import {defineComponent, ref, computed} from "vue";
import {useModal} from './composable/useModal'
import {useStore} from "./store";
import {User} from "./types";

export default defineComponent({
  name: 'SignUp',
  components: {FormInput},
  setup() {
    const username = ref('')
    const password = ref('')

    const statusUsername = computed<Status>(() => validate(username.value, [required(), length({min: 5, max: 20})]))
    const statusPassword = computed<Status>(() => validate(password.value, [required(), length({min: 5, max: 20})]))

    const store = useStore()

    const user: User = {
      id: -1,
      username: username.value,
      password: password.value,
    }

    const modal = useModal()
    const submit = (e: any) => {
      if (!statusUsername.value.valid || !statusPassword.value.valid) {
        return
      }
      store.createUser(user)
      modal.hide()
    }
    return {
      username,
      password,
      statusUsername,
      statusPassword,
      submit,
    }
  }
})

</script>

<style scoped>
  form {
    background-color: white;
    padding: 20px;
  }
</style>
