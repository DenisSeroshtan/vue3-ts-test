<template>
  <router-link data-test="can-edit" v-if="canEdit" :to="to" class="button is-rounded is-link is-pulled-right">
    <i class="fas fa-edit"></i>
  </router-link>
  <h1>
    {{ post.title }}
  </h1>
  <div v-html="post.html"></div>
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
    const canEdit = post.authorId === parseInt(store.getState().authors.currentUserId!, 10)

    return {
      post,
      to: `/posts/${post.id}/edit`,
      canEdit
    }
  }
})
</script>
