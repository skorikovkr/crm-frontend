<template>
  <ClientOnly>
    <template 
      v-if="userStore.user"
    >
      <button
        class="profile-button bg-teal-500 rounded-lg h-[32px] w-[32px] flex items-center justify-center"
        @click="onProfileIconClick"
      >
        <div class="name-letter text-white font-medium text-center">
          {{ userStore.user?.name[0] }}
        </div>
      </button>
      <OverlayPanel
        ref="op"
        :pt="{
          content: 'shadow-2xl bg-white rounded-2xl flex items-center'
        }"
      >
        <ProfileDropdown />
      </OverlayPanel>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const userStore = useUserStore();

const op = ref();
const onProfileIconClick = (event: MouseEvent) => {
  op.value.toggle(event);
};

</script>

<style>

</style>