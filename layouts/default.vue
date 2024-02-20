<script setup lang="ts">
import type { User } from '~/types/User';

const currentUserStore = useCurrentUserStore();
currentUserStore.setUser((await useFetch<User>('/api/user/1')).data.value ?? null);
const companyInfo = currentUserStore.user?.companies?.find(c => c.id === currentUserStore.user?.currentCompanyId) ?? null;

</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <DefaultLayoutHeader
      :company-info="companyInfo"
    />
    <main class="w-full flex-1">
      <slot />
    </main>
    <DefaultLayoutFooter
      :company-info="companyInfo"
    />
  </div>
</template>