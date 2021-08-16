<template>
  <div>
    {{ post.title }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from './store';
import {useRoute} from 'vue-router';

export default defineComponent({

  async setup() {
    const store = useStore()
    const route = useRoute()

    const id = route.params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }
    const post = store.getState().posts.all[id]


    return {
      post
    }
  }
})
</script>
