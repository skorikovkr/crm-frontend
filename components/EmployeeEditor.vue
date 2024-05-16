<template>
  <div>
    <DataTable
      v-if="!pending"
      :value="employees"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
    >
      <Column field="name" header="ФИО"></Column>
      <Column field="furniture_maker_role_id" header="Роль">
        <template #body="slotProps">
          {{ miscStore.furnitureMakerRoles?.find(r => r.id == slotProps.data.furniture_maker_role_id)?.i18n ?? '' }}
        </template>
      </Column>
      <Column
        field="__controls"
        :style="{
          width: '75px'
        }"
      >
        <template #body="slotProps">
          <div class="flex gap-1">
            <Button icon="pi pi-user-edit" />
            <Button icon="pi pi-trash" severity="danger"/>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
type Employee = {
  user_id: number,
  name: string,
  email: string,
  phone: string|null,
  logo_src: string|null,
  furniture_maker_role_id: number
};

const companyStore = useCompanyStore();
const miscStore = useMiscEnumsStore();
const { data: employees, pending } = await useLaravelFetch<Employee[]>(`/api/organizations/${companyStore.current?.id}/employees`);
</script>

<style>

</style>