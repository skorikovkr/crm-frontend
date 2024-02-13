<script setup lang="ts">
import type { CompanyInfo } from '~/types/CompanyInfo';

const { data: companyInfo } = await useFetch<CompanyInfo>('/api/company/info?id=1');
const currentUserStore = useMyCurrentUserStore();
currentUserStore.setUser(1, "Test user");
</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <DefaultLayoutHeader
      :company-info="companyInfo"
      class="sticky top-0"
    />
    <main class="w-full flex-1">
      <slot />
    </main>
    <DefaultLayoutFooter
      :company-info="companyInfo"
    />
  </div>
</template>