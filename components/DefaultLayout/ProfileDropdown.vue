<script lang="ts" setup>
import type { Company } from '~/types/Company';
import { Roles } from '~/types/Roles';

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const userStore = useUserStore();
const companyStore = useCompanyStore();
const { data: companies, pending } = await useFetch(`/api/company/getAll`);  // TODO: позже сделать получение всех компаний пользователя (либо вкладывать список всех компаний пользователя в самом User) 
</script>

<template>
  <div
    class="absolute w-[224px] top-[32px] right-0 shadow-2xl bg-white rounded-2xl"
    :class="{ hidden: !isVisible }"
  >
    <Dropdown
      v-if="!pending"
      v-model="companyStore.current"
      :options="companies ?? []"
      option-label="company"
      :pt="{
        root: {
          class: 'w-full flex justify-between py-3 px-4 h-[61px] cursor-pointer'
        },
        input: {
          class: 'p-0'
        },
        trigger: {
          class: 'pt-3'
        },
        panel: {
          class: 'bg-white p-0 pt-0 pb-3 rounded-b-2xl rounded-t-none border-t-[1px] border-surface-200 border-b-6 rounded-2xl shadow-xl'
        },
        item: ({ props, state, context }) => ({
          class: 'pt-3 px-3 cursor-pointer'
        })
      }"
    >
      <template #value="slotProps">
        <div
          class="flex flex-col align-items-center"
        >
          <div class="font-medium text-sm">
            {{ (slotProps.value as Company).fullName }}
          </div>
          <div class="font-normal text-gray-500 text-xs">
            {{ (slotProps.value as Company).ogrn }}
          </div>
        </div>
      </template>
      <template #option="slotProps">
        <div
          class="flex flex-col align-items-center"
        >
          <div class="font-medium text-sm">
            {{ (slotProps.option as Company).fullName }}
          </div>
          <div class="font-normal text-gray-500 text-xs">
            {{ (slotProps.option as Company).ogrn }}
          </div>
        </div>
      </template>
    </Dropdown>
    <nav class="profile-nav">
      <ul class="border-y-[1px] pb-1 border-surface-200">
        <li>
          <NuxtLink
            class="block py-2 pl-4 w-full h-[37px] hover:bg-slate-100"
            to="/profile"
          >
            Профиль
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="block py-2 pl-4 w-full h-[37px] hover:bg-slate-100"
            to="orders"
          >
            Мои заказы
          </NuxtLink>
        </li>
        <li v-if="userStore.user?.role === Roles.FurnitureMakerOwner">
          <NuxtLink
            class="block py-2 pl-4 w-full h-[37px] hover:bg-slate-100"
            to="organizations"
          >
            Мои организации
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink
        class="block w-full py-2 pl-4 h-[45px] hover:bg-slate-100"
        to="/logout"
      >
        Выйти
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped>
  .hidden {
    visibility: hidden;
    display: none;
  }
</style>~/types/Role