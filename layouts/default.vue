<script setup lang="ts">
import type { CompanyInfo } from '~/types/CompanyInfo';

const { data: companyInfo } = await useFetch<CompanyInfo>('/api/company/info?id=1');
const currentUserStore = useMyCurrentUserStore();
currentUserStore.setUser(1, "Test user");
</script>

<template>
  <div class="container min-h-[100vh] flex flex-col justify-between min-w-[100vw] max-w-[100vw]">
    <DefaultLayoutHeader
      :company-info="companyInfo"
    />
    <div class="w-full">
      <slot />
    </div>
    <DefaultLayoutFooter
      :company-info="companyInfo"
    />
  </div>
</template>