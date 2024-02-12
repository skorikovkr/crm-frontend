<script setup lang="ts">
import type { CompanyInfo } from '~/types/CompanyInfo';

defineProps<{
  companyInfo: CompanyInfo | null
}>();
</script>

<template>
  <footer>
    <DefaultLayoutCTA 
      v-if="companyInfo"
      :phone="companyInfo.phone"
      :schedule="companyInfo.schedule"
    />
  </footer>
</template>