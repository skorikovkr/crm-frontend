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

      <ClientFormInput
        create-dialog-header="Добавление клиента"
        label="Клиент:"
        form-input-name="client_id"
        placeholder="Выберите клиента"
      />

      <OrderFormInput
        create-dialog-header="Добавление заказа"
        label="Является версией заказа:"
        form-input-name="version_of"
        placeholder="Выберите заказ"
      />

      <Button
        type="submit"
        label="Сохранить"
      />
    </form>
  </div>
</template>
  
<script lang="ts" setup>
  import type { MiscEnum } from '~/types/MiscEnum';
  
  const createOrderForm = ref();
  const miscStore = useMiscEnumsStore();
  const companyStore = useCompanyStore();
  const calculator = ref<MiscEnum|null>(null);

  const handleCreateOrder = async () => {
    try {
      const formData = new FormData(createOrderForm.value);
      if (! companyStore.current?.id) {
          throw new Error('Organization Id is required');
      }
    //   await $laravelFetch(`/api/register-user/organizations/${props.organizationId}`, {
    //     method: 'POST',
    //     body: formData
    //   });
    } catch (error) {
      console.log(error);
    }
  }
</script>
  
<style>

</style>