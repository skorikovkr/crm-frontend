<script lang="ts" setup>
import type { Company } from '~/types/Company';

defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
});

const router = useRouter();

const userStore = useUserStore();
const enumsStore = useMiscEnumsStore();
const companies = userStore.user?.organizations;

const getFurnitureRole = (companyId: number) => {
    const orgRoleId = userStore.user?.roles_in_organizations.find(r => r.organization_id === companyId)?.furniture_maker_role_id;
    return enumsStore.furnitureMakerRoles?.find((r) => r.id === orgRoleId)?.i18n;
};

const handleCompanyChange = async (e: {
    value: Company
}) => {
    await $laravelFetch(`/api/organizations/change-current-to/${e.value.id}`, {
        method: "POST"
    });
    await userStore.refresh();
    router.push(`/company/${e.value.id}/public`);
}

</script>

<template>
  <div
    class="absolute w-[224px] top-[32px] right-0 shadow-2xl bg-white rounded-2xl"
    :class="{ hidden: !isVisible }"
  >
    <Dropdown
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
      @change="handleCompanyChange"
    >
      <template #value="slotProps">
        <div
          class="flex flex-col align-items-center"
        >
          <template 
            v-if="slotProps.value !== null && slotProps.value !== undefined"
          >
            <div
              class="font-medium text-sm"
            >
              {{ (slotProps.value as Company).name }} ({{ getFurnitureRole((slotProps.value as Company).id) }})
            </div>
            <div class="font-normal text-gray-500 text-xs">
              {{ (slotProps.value as Company).OGRN }}
            </div>
          </template>
          <template v-else>
            <div class="font-medium text-sm pt-2">
              {{ userStore.user?.name }}
            </div>
          </template>
        </div>
      </template>
      <template #option="slotProps">
        <div
          class="flex flex-col align-items-center"
        >
          <div class="font-medium text-sm">
            {{ (slotProps.option as Company).name }} ({{ getFurnitureRole((slotProps.option as Company).id) }})
          </div>
          <div class="font-normal text-gray-500 text-xs">
            {{ (slotProps.option as Company).OGRN }}
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
        <li>
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
</style>