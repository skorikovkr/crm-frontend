<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-section">
    <h2>{{ error?.statusCode }}</h2>
    <p>{{ error?.statusMessage }}</p>
    <button @click="handleError">
      Clear errors
    </button>
  </div>
</template>