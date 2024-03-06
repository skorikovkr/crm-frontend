<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

const { user } = useUserStore();
</script>

<template>
  <div>
    <h1>Profile of {{ user?.email }} {{ user?.role }}</h1>
    <div>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/profile">
        profile
      </NuxtLink>
      <NuxtLink to="/asdf">
        404
      </NuxtLink>
    </div>
  </div>
</template>

<style>

</style>