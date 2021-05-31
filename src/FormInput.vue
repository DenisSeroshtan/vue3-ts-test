<template>
  <div class="field">
    <label v-if="label" :for="name" class="label">{{ label }}</label>
    <div class="control">
      <input :type="type" :id="name" class="input" @input="handleInput" :value="modelValue">
    </div>
    <p v-if="error" class="has-text-danger">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    }

  },
  setup(props, ctx) {
    const handleInput = (event: any) => {
      ctx.emit('update:modelValue', event.target.value)
    }
    return {
      handleInput
    }
  }
})
</script>


