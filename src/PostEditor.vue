<template>
 <PostWriter :post="post" @save="save"></PostWriter>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

import {useStore} from "./store";
import {useRoute, useRouter} from "vue-router";
import { Post } from './types';
import PostWriter from "./PostWriter.vue";

export default defineComponent({
  components: {
    PostWriter,
  },
  async setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const id = route.params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }
    const post = store.getState().posts.all[id]
    const canEdit = post.authorId === parseInt(store.getState().authors.currentUserId!, 10)

    if (!canEdit) {
      await router.push('/')
    }

    const save = async(post: Post) => {
      await store.updatePost(post)
      router.push('/')
    }

    return {
      post,
      save,
      to: `/posts/${post.id}/edit`
    }
  }
})
</script>
