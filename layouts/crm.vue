<script setup lang="ts">
const companyStore = useCompanyStore();
</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <DefaultLayoutHeader />
    <div class="flex-1 flex h-full">
      <aside class="border-r-[1px] border-surface-200 w-[250px] flex flex-col pt-6 text-gray-900 font-medium">
        <NuxtLink
          :to="`/company/${companyStore.current?.id}/crm/orders`"
        >
          <div class="hover:bg-gray-100 px-5 py-2">
            <i class="pi pi-truck mr-3" style="color: #708090"></i> Заказы
          </div>
        </NuxtLink>
        <NuxtLink
          :to="`/`"
        >
          <div class="hover:bg-gray-100 px-5 py-2">
            <i class="pi pi-user mr-3" style="color: #708090"></i> Клиенты
          </div>
        </NuxtLink>
        <NuxtLink
          :to="`/company/${companyStore.current?.id}/crm/update`"
        >
          <div class="hover:bg-gray-100 px-5 py-2">
            <i class="pi pi-building mr-3" style="color: #708090"></i> Организация
          </div>
        </NuxtLink>
      </aside>
      <main class="mx-auto w-full px-4 sm:px-6 p-8 bg-gray-50">
        <slot />
      </main>
    </div>
    <DefaultLayoutFooter />
  </div>
</template>