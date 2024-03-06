<script setup lang="ts">

const company = useCompanyStore();
const logoAlt = computed(() => `Логотип компании "${company.current?.name}"`);
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
          v-if="company.current"
          class="h-[32px]"
          :src="company.current.logoSrc"
          :alt="logoAlt"
        >
      </NuxtLink>
      <DefaultLayoutCTA 
        v-if="company.current"
        :phone="company.current.phone"
        :schedule="company.current.schedule"
      />
    </div>
    <Divider />
    <div class="footer_socials pb-16">
      <small
        v-if="company.current"
        class="font-normal text-gray-500">&copy; {{ currentYear }} {{ company.current.name }}, Все права защищены
      </small>
    </div>
  </footer>
</template>