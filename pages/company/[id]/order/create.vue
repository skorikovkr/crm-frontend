<template>
  <div>
    <form
      ref="createOrderForm"
      class="flex flex-col gap-2"
      @submit.prevent="handleCreateOrder"
    >
      <label for="name">Наименование:</label>
      <InputText 
        name="name" 
      />
      
      <label for="address">Адрес:</label>
      <InputText 
        name="address" 
      />
      
      <Dropdown
        v-model="calculator"
        :options="miscStore.calculators ?? undefined" 
        option-label="i18n"
        label
        placeholder="Калькулятор:"
      />
      <input
        type="text"
        name="calculator_id"
        hidden 
        :value="calculator?.id"
      >
      
      <label for="address">Клиент:</label>
      <InputText
        :value="client?.name"
        placeholder="Выберите клиента"
        class="cursor-pointer"
        :readonly="true"
        @click="clientPickerVisible = true"
      />
      <input
        type="text"
        name="client_id"
        hidden 
        :value="client?.id"
      >

      <Button
        type="submit"
        label="Сохранить"
      />
    </form>

    <Dialog
      v-model:visible="clientPickerVisible"
      modal
      header="Выбор клиента"
    >
      <ClientPicker
        v-model:selectedClient="client"
        :organization-id="companyStore.current?.id"
      />
    </Dialog>
  </div>
</template>
  
<script lang="ts" setup>
  import type { MiscEnum } from '~/types/MiscEnum';
  import type { Client } from '~/types/Client';

  definePageMeta({ middleware: ["load-company"] });
  
  const createOrderForm = ref();
  const miscStore = useMiscEnumsStore();
  const companyStore = useCompanyStore();
  const calculator = ref<MiscEnum|null>(null);
  const client = ref<Client|null>(null);
  const clientPickerVisible = ref(false);
  
  watch(client, () => {
    clientPickerVisible.value = false;
  });

  const handleCreateOrder = async () => {
    // try {
    //   const formData = new FormData(createOrderForm.value);
    //   if (! props.organizationId) {
    //       throw new Error('Organization Id is required');
    //   }
    //   await $laravelFetch(`/api/register-user/organizations/${props.organizationId}`, {
    //     method: 'POST',
    //     body: formData
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  
  </script>
  
  <style>
  
  </style>