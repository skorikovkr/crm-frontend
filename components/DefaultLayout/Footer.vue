<script setup lang="ts">

const config = useRuntimeConfig();

const companyStore = useCompanyStore();
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
          v-if="companyStore.current"
          class="h-[32px]"
          :src="config.public.backendUrl + '/' + companyStore.current.logo_src?.replace('public', 'storage')"
          :alt="companyStore.logoAlt"
        >
      </NuxtLink>
      <DefaultLayoutCTA 
        v-if="companyStore.current"
        :phone="companyStore.current.phone ?? 'Нет телефона.'"
        :schedule="companyStore.current.schedule ?? 'Нет расписания.'"
      />
    </div>
    <Divider />
    <div class="footer_socials pb-16">
      <small
        v-if="companyStore.current"
        class="font-normal text-gray-500"
      >&copy; {{ currentYear }} {{ companyStore.current.name }}, Все права защищены
      </small>
    </div>
  </footer>
</template>