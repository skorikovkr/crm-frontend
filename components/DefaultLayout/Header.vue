<script setup lang="ts">

const navbarItems = [
  {
    text: "О компании",
    url: "#"
  },
  {
    text: "Калькуляторы",
    url: "#"
  },
  {
    text: "Портфолио",
    url: "#"
  },
];

const companyStore = useCompanyStore();
const config = useRuntimeConfig();
</script>

<template>
  <header class="header flex sticky top-0 flex-row justify-between px-[80px] py-[24px] border-b-[1px] border-surface-200 bg-white">
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

    <div class="header_logo absolute left-[50%]">
      <NuxtLink
        :to="`/company/${companyStore.current?.id}/public`"
        class="block relative left-[-50%]"
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
        :schedule="companyStore.current.schedule ?? 'Нет расписания'"
        class="pr-4"
      />
      <ProfileButton />
    </div>
  </header>
</template>