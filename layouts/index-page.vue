<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <header class="header flex sticky top-0 flex-row-reverse justify-between px-[80px] py-[24px] border-b-[1px] border-surface-200 z-[1000]">
      <div class="header_logo absolute left-[50%] top-[30%]">
        <NuxtLink
          to="/"
          class="block relative left-[-50%] top-[-50%] font-serif font-medium text-2xl"
        >
          Мебельная Компания
        </NuxtLink>
      </div>
      <div 
        class="header_right-part flex relative h-[32px]"
      >
        <ProfileButton />
        <NuxtLink
          v-if="!userStore.isLoggedIn"
          to="/login"
        >
          <Button
            severity="secondary"
            text
            label="Зайти в личный кабинет" 
          />
        </NuxtLink>
      </div>
    </header>
    <main class="flex-1 mx-auto w-full max-w-3xl h-full px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
</script>

<style>

</style>