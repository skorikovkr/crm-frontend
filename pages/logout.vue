<script lang="ts" setup>
    const userStore = useUserStore();
    await userStore.logout();
    navigateTo('/login');
</script>

<template>
  <div>Logging out...</div>
</template>

<style>
</style>