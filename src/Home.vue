<template>
  <Suspense>
    <template #default>
      <Timeline/>
    </template>
    <template #fallback>
      <Progress/>
    </template>
  </Suspense>
</template>


<script>
  import Timeline from "./Timeline.vue"
  import Progress from './Progress.vue'

  export default {
    name: "Home",
    components: {
      Timeline,
      Progress,
    }
  }
</script>

