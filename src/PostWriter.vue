<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input type="text" v-model="title" class="input"/>
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-half">
        <div contenteditable ref="contenteditable" @input="handleEdit"></div>
      </div>
      <div class="column is-one-half">
        {{ markdown }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue'
import {Post} from "./types";

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },
  setup(props) {
    const title = ref(props.post.title)
    const contenteditable = ref<null | HTMLDivElement>(null)
    const markdown = ref(props.post.markdown)

    const handleEdit = () => (
        markdown.value = contenteditable.value.innerText
    )

    onMounted(() => {
      contenteditable.value.innerText = markdown.value
    })

    return {
      title,
      contenteditable,
      handleEdit,
      markdown,
    }
  },
})
</script>
