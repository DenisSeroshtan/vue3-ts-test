<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a v-for="period in periods" :key="period" href="#"> {{ period }}</a>
    </p>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Period } from './types'

export default defineComponent({
  setup() {
    const periods: Period[] = ['сегодня', 'на этой неделе', 'в этот месяц']

    return {
      periods,
    }
  }
})
</script>


