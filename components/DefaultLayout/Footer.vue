<script setup lang="ts">
import type { Company } from '~/types/Company';

const props = defineProps<{
  companyInfo: Company | null
}>();

const logoAlt = computed(() => `Логотип компании "${props.companyInfo?.name}"`);
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="px-20 pt-16">
    <div class="footer_top-content flex justify-between ">
      <NuxtLink
        to="/"
        class="block"
      >
        <img
          v-if="companyInfo"
          class="h-[32px]"
          :src="companyInfo.logoSrc"
          :alt="logoAlt"
        >
      </NuxtLink>
      <DefaultLayoutCTA 
        v-if="companyInfo"
        :phone="companyInfo.phone"
        :schedule="companyInfo.schedule"
      />
    </div>
    <Divider />
    <div class="footer_socials pb-16">
      <small class="font-normal text-gray-500">&copy; {{ currentYear }} {{ companyInfo?.name }}, Все права защищены</small>
    </div>
  </footer>
</template>