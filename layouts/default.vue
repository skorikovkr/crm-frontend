<script setup lang="ts">
import type { User } from '~/types/User';

//const company = currentUserStore.user?.companies?.find(c => c.id === currentUserStore.user?.currentCompanyId) ?? null;

</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <!-- <DefaultLayoutHeader
      :company-info="company"
    /> -->
    <main class="w-full flex-1">
      <slot />
    </main>
    <!-- <DefaultLayoutFooter
      :company-info="company"
    /> -->
  </div>
</template>