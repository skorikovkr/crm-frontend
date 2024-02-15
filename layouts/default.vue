<script setup lang="ts">
import type { Company } from '~/types/Company';
import type { User } from '~/types/User';

const currentUserStore = useCurrentUserStore();
currentUserStore.setUser((await useFetch<User>(`/api/user/${1}`)).data.value ?? null);
const { data: companyInfo } = await useFetch<Company>(`/api/company/${currentUserStore.user?.currentCompanyId}`);

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