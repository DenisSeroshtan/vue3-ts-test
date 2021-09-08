<template>
  <Suspense>
    <template #default>
      <PostEditor></PostEditor>
    </template>
    <template #fallback>
      <Progress></Progress>
    </template>
  </Suspense>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PostEditor from "./PostEditor.vue";
import Progress from "./Progress.vue";

export default defineComponent({
  components: {
    PostEditor,
    Progress
  }
})
</script>
