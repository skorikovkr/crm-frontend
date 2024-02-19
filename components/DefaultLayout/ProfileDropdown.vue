<script lang="ts" setup>
import type { Company } from '~/types/Company';
import { Roles } from '~/types/Roles';

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const currentUserStore = useCurrentUserStore();
const { data } = await useFetch<Company>(`/api/company/${currentUserStore.user?.currentCompanyId}`);
const selectedCompany = ref(data.value);
const { data: companies } = await useFetch<Company[]>('/api/company/getAll');

</script>

<template>
  <div 
    class="absolute w-[224px] top-[32px] right-0 shadow-md bg-white rounded-2xl"
    :class="{ hidden: !isVisible }"
  >
    <Dropdown
      v-model="selectedCompany"
      :options="companies ?? []"
      option-label="company"
      :pt="{
        root: { class: 'w-full flex justify-between py-3 px-4 h-[61px]' },
        input: {
          class: 'p-0'
        },
        trigger: {
          class: 'pt-3'
        },
        panel: {
          class: 'bg-white shadow-none p-3 pb-1 rounded-b-2xl border-t-[1px] border-surface-200'
        },
        item: ({ props, state, context }) => ({
          class: (context.focused ? 'bg-slate-100' : undefined)
        })
      }"
    >
      <template #value="slotProps">
        <div
          v-if="slotProps.value"
          class="flex flex-col align-items-center roun"
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
          v-if="slotProps.option"
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
            to="profile"
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
        <li v-if="currentUserStore.user?.role === Roles.Owner">
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
        to="logout"
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
</style>