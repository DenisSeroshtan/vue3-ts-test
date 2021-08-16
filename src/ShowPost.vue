<template>
  <Suspense>
    <template #default>
      <PostViewer></PostViewer>
    </template>
    <template #fallback>
      <Progress></Progress>
    </template>
  </Suspense>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PostViewer from "./PostViewer.vue";
import Progress from "./Progress.vue";

export default defineComponent({
  components: {
    PostViewer,
    Progress
  }
})
</script>
