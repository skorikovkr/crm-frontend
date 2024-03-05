<script setup lang="ts">
import type { Company } from '~/types/Company';

const props = defineProps<{
  company: Company | null
}>();

const logoAlt = computed(() => `Логотип компании "${props.company?.name}"`);
const currentYear = getUTCDate(new Date()).getFullYear();
</script>

<template>
  <footer class="px-20 pt-16">
    <div class="footer_top-content flex justify-between ">
      <NuxtLink
        to="/"
        class="block"
      >
        <img
          v-if="company"
          class="h-[32px]"
          :src="company.logoSrc"
          :alt="logoAlt"
        >
      </NuxtLink>
      <DefaultLayoutCTA 
        v-if="company"
        :phone="company.phone"
        :schedule="company.schedule"
      />
    </div>
    <Divider />
    <div class="footer_socials pb-16">
      <small class="font-normal text-gray-500">&copy; {{ currentYear }} {{ company?.name }}, Все права защищены</small>
    </div>
  </footer>
</template>~/utils/getUTCDate