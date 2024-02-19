<script setup lang="ts">
import type { Company } from "~/types/Company";

const props = defineProps<{
  companyInfo: Company | null
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
const currentUserStore = useCurrentUserStore();
const currentUser = currentUserStore.user;

const isProfileDropdownVisible = ref(false);
const onProfileIconClick = () => {
  isProfileDropdownVisible.value = !isProfileDropdownVisible.value;
};
</script>

<template>
  <header class="header flex flex-row justify-between px-[80px] py-[24px] relative border-b-[1px] border-surface-200">
    <nav class="header_navbar bg-white flex items-center">
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

    <div class="header_right-part flex flex-row relative">
      <DefaultLayoutCTA
        v-if="companyInfo"
        :phone="companyInfo.phone"
        :schedule="companyInfo.schedule"
        class="pr-4"
      />
      <button
        class="profile-button bg-teal-500 rounded-lg h-[32px] w-[32px] flex items-center justify-center"
        @click="onProfileIconClick"
      >
        <div class="name-letter text-white font-medium text-center">
          {{ currentUser?.name[0] }}
        </div>
      </button>
      <DefaultLayoutProfileDropdown
        :is-visible="isProfileDropdownVisible"
      />
    </div>
  </header>
</template>