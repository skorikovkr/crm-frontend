<script setup lang="ts">
import type { CompanyInfo } from "~/types/CompanyInfo";

const props = defineProps<{
  companyInfo: CompanyInfo | null
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
const currentUserStore = useMyCurrentUserStore();
const currentUser = currentUserStore.user;
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
      <DefaultLayoutCTA
        v-if="companyInfo"
        :phone="companyInfo.phone"
        :schedule="companyInfo.schedule"
        class="pr-4"
      />
      <div class="profile-button bg-teal-500 rounded-lg h-[32px] w-[32px] flex items-center justify-center">
        <div class="name-letter text-white font-medium text-center">
          {{ currentUser?.name[0] }}
        </div>
      </div>
    </div>
  </header>
</template>