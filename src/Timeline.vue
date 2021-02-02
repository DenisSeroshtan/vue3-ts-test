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
    <TimelinePost v-for="post in posts" :key="post.id" :post="post"/>
  </nav>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Period } from './types'
import {todayPost, thisWeek, thisMonth} from './mocks'
import TimelinePost from "./TimelinePost.vue";
import moment from 'moment'


export default defineComponent({
  components: {
    TimelinePost,
  },
  setup() {
    const periods: Period[] = ['сегодня', 'на этой неделе', 'в этот месяц']
    const selectedPeriod = ref<Period>('сегодня')
    const setPeriod = (period: Period) => selectedPeriod.value = period
    const posts = computed(() => [todayPost, thisWeek, thisMonth].filter(post => {
        if (selectedPeriod.value === 'сегодня' && post.created.isAfter(moment().subtract(1, 'day'))) {
            return true
        }
        if (selectedPeriod.value === 'на этой неделе' && post.created.isAfter(moment().subtract(7, 'day'))) {
            return true
        }
        if (selectedPeriod.value === 'в этот месяц' && post.created.isAfter(moment().subtract(1, 'month'))) {
            return true
        }

        return false

    }))
    return {
      periods,
      selectedPeriod,
      setPeriod,
      posts,
    }
  }
})
</script>


