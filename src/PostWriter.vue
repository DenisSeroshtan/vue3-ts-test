<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input type="text" v-model="title" class="input" data-test="post-title"/>
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-half">
        <div contenteditable ref="contenteditable" @input="handleEdit" data-test="markdown"></div>
      </div>
      <div class="column is-one-half">
        <div v-html="html"></div>
      </div>
    </div>
    <button class="button is-primary" data-test="submit-post" @click="savePost">Save</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, watch} from 'vue'
import {Post} from "./types";
import {parse, MarkedOptions} from 'marked'
import {highlightAuto} from "highlight.js";
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },
  emits: ['save'],
  setup(props, {emit}) {
    const title = ref(props.post.title)
    const contenteditable = ref<null | HTMLDivElement>(null)
    const markdown = ref(props.post.markdown)
    const html = ref('')

    const options: MarkedOptions = {
      highlight: (code: string) => {
        highlightAuto(code).value
      }
    }
    const handleEdit = () => (
        markdown.value = contenteditable.value.innerText
    )

    onMounted(() => {
      contenteditable.value.innerText = markdown.value
    })

    const update = (value: string): void => {
      html.value = parse(value, options)
    }

    const savePost = () => {
      const post: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: markdown.value,
      }
      emit('save', post)
    }
    watch(markdown, debounce(update, 500), {immediate: true})

    return {
      title,
      contenteditable,
      markdown,
      html,
      handleEdit,
      savePost,
    }
  },
})
</script>
