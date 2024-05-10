<script setup lang="ts">


const companyStore = useCompanyStore();
const config = useRuntimeConfig();

const navbarItems = [
  {
    text: "О компании",
    url: `/company/${companyStore.current?.id}/public`
  },
  {
    text: "Калькуляторы",
    url: "#"
  },
];
</script>

<template>
  <header class="header flex sticky top-0 flex-row justify-between px-[80px] py-[24px] border-b-[1px] border-surface-200 bg-white z-50">
    <nav class="header_navbar flex items-center">
      <ul class="flex flex-row gap-6 my-auto">
        <li
          v-for="item in navbarItems"
          :key="item.text"
        >
          <NuxtLink
            :to="item.url"
            class="block text-gray-900 font-medium"
          >
            {{ item.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="header_logo">
      <NuxtLink
        :to="`/company/${companyStore.current?.id}/public`"
        class="block"
      >
        <img
          v-if="companyStore.current?.logo_src"
          class="h-[32px]"
          :src="config.public.backendUrl + '/' + companyStore.current.logo_src?.replace('public', 'storage')"
          :alt="companyStore.logoAlt"
        >
      </NuxtLink>
    </div>

    <div class="header_right-part flex flex-row relative">
      <DefaultLayoutCTA
        v-if="companyStore.current"
        :phone="companyStore.current.phone ?? 'Нет телефона.'"
        :schedule="companyStore.current.schedule ?? ''"
        class="pr-4"
      />
      <ProfileButton />
    </div>
  </header>
</template>