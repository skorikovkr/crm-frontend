<script setup lang="ts">
import type { CompanyInfo } from '~/types/CompanyInfo';
import type { User } from '~/types/User';

const { data: companyInfo } = await useFetch<CompanyInfo>('/api/company/info?id=1');
const currentUser = ref<User>({
  id: 1,
  name: "Test-user"
});
</script>

<template>
  <div class="container min-h-[100vh] flex flex-col justify-between min-w-[100vw] max-w-[100vw]">
    <DefaultLayoutHeader
      :company-info="companyInfo"
      :current-user="currentUser"
    />
    <div class="w-full">
      <slot />
    </div>
    <DefaultLayoutFooter
      :company-info="companyInfo"
    />
  </div>
</template>