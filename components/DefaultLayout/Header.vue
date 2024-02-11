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
const { data } = await useFetch('/api/company/info?id=1')
const companyInfo = data;
const logoAlt = computed(() => `Логотип компании "${companyInfo.value?.name}"`);
</script>

<template>
  <header class="header flex flex-row justify-between px-6 py-6 relative">
    <nav class="header_navbar bg-white">
      <ul class="flex flex-row gap-6">
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
        to="/"
        class="block relative left-[-50%]"
      >
        <img
          v-if="companyInfo"
          class="h-[32px]"
          :src="companyInfo.logoSrc"
          :alt="logoAlt"
        >
      </NuxtLink>
    </div>

    <div class="header_cta flex flex-row">
      <div class="schedule pr-4 text-gray-500 font-medium text-sm">
        <time>Пн-Пт: 8:00-17:00</time>
      </div>
      <a
        class="block text-gray-500 font-medium text-sm"
        href="tel:+1234567890"
      >+1234567890</a>
    </div>
  </header>
</template>