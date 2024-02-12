<script setup lang="ts">
import type { CompanyInfo } from "~/types/CompanyInfo";
import type { User } from "~/types/User";

const props = defineProps<{
  companyInfo: CompanyInfo | null,
  currentUser: User | null
}>();

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
const logoAlt = computed(() => `Логотип компании "${props.companyInfo?.name}"`);
</script>

<template>
  <header class="header flex flex-row justify-between px-[80px] py-[24px] relative">
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

    <div class="header_right-part flex flex-row">
      <div class="cta flex flex-row pr-4">
        <DefaultLayoutCTA
          v-if="companyInfo"
          :phone="companyInfo.phone"
          :schedule="companyInfo.schedule"
        />
      </div>
      <div class="profile-button bg-teal-500 rounded-lg h-[32px] w-[32px] flex items-center justify-center">
        <div class="name-letter text-white font-medium text-center">
          {{ currentUser?.name[0] }}
        </div>
      </div>
    </div>
  </header>
</template>