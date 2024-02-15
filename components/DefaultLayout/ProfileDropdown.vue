<script lang="ts" setup>
  defineProps({
    isVisible: {
      type: Boolean,
      default: false
    }
  });
</script>

<template>
  <div 
    class="absolute h-[100px] w-[100px] top-[32px] right-0 bg-black"
    :class="{ hidden: !isVisible }"
  >
    a
  </div>
</template>

<style scoped>
  .hidden {
    visibility: hidden;
    display: none;
  }
</style>