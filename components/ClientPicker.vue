<template>
  <div>
    <DataTable
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="clients"
      table-style="min-width: 50rem;"
    >
      <Column
        field="name"
        header="ФИО"
        sortable
      />
      <Column
        field="phone"
        header="Телефон"
        sortable
      />
      <Column
        field="email"
        header="Почта"
        sortable
      />
      <Column
        field="__controls"
        header=""
        :show-filter-menu="false"
      >
        <template #body="{ data }">
          <Button
            label="Выбрать"
            @click="() => handleClientClick(data)"
          />
        </template>
      </Column>
    </DataTable>
    <Button
      label="Добавить клиента"
      @click="clientCreatorVisible = true"
    />

    <Dialog
      v-model:visible="clientCreatorVisible"
      modal
      header="Добавление клиента"
    >
      <CreateClientComponent
        :organization-id="organizationId"
        @client-created="handleClientCreated"
      />
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Client } from '~/types/Client';

const selectedClient = defineModel<Client|null>('selectedClient');

const props = defineProps<{
  organizationId?: string|number
}>();

const clients = ref<Client[]>([]);
const clientCreatorVisible = ref(false);

const refresh = async () => {
  clients.value = await $laravelFetch<Client[]>(`/api/organizations/${props.organizationId}/clients`);
};

const handleClientClick = (client: Client) => {
  selectedClient.value = client;
}

const handleClientCreated = (client: Client) => {
  clientCreatorVisible.value = false;
  clients.value.push(client);
}

defineExpose({
  refresh
});

</script>

<style>

</style>