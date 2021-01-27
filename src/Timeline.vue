<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="selectedPeriod === period ? 'is-active' : ''"
        href="#"
        data-test="period"
        @click="setPeriod(period)"

      > {{ period }}</a>
    </p>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Period } from './types'

export default defineComponent({
  setup() {
    const periods: Period[] = ['сегодня', 'на этой неделе', 'в этот месяц']
    const selectedPeriod = ref<Period>('сегодня')
    const setPeriod = (period: Period) => selectedPeriod.value = period

    return {
      periods,
      selectedPeriod,
      setPeriod,
    }
  }
})
</script>


