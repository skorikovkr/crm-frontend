<script lang="ts" setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const currentUserStore = useCurrentUserStore();
console.log(currentUserStore.user);
</script>

<template>
  <div 
    class="absolute w-[224px] top-[32px] right-0 shadow-md"
    :class="{ hidden: !isVisible }"
  >
    <div v-for="c in currentUserStore.user?.companies" :key="c.id">{{ c.fullName }}</div>
  </div>
</template>

<style scoped>
  .hidden {
    visibility: hidden;
    display: none;
  }
</style>