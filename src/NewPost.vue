<template>
  <div>
    <PostWriter :post="post" @save="savePost"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PostWriter from "./PostWriter.vue";
import {Post} from './types'
import moment from "moment";
import {useStore} from './store';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'NewPost',
  components: {
    PostWriter,
  },
  setup() {
    const post: Post = {
      id: -1,
      title: 'New Post',
      markdown: '## New Post \n Enter your post here...',
      html: '',
      created: moment(),
      authorId: 0,
    }
    const store = useStore()
    const router = useRouter()

    const savePost = async (post: Post) => {
      await store.createPost(post)
      await router.push('/')
    }

    return {
      post,
      savePost,
    }
  }
})
</script>
