<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

const user = useUser();
</script>

<template>
  <div>
    <h1>Profile of {{ user?.email }}</h1>
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