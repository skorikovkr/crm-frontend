<template>
  <div class="grid grid-cols-2">
    <form
      ref="createOrderForm"
      class="flex flex-col gap-2"
      @submit.prevent="handleCreateOrder"
    >
      <label for="name">Наименование:</label>
      <InputText
        v-model="name"
        name="name"
      />
      
      <label for="address">Адрес:</label>
      <InputText 
        v-model="address"
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
        v-model="client"
        create-dialog-header="Добавление клиента"
        label="Клиент:"
        form-input-name="client_id"
        placeholder="Выберите клиента"
      />

      <OrderFormInput
        v-model="order"
        create-dialog-header="Добавление заказа"
        label="Является версией заказа:"
        form-input-name="version_of"
        placeholder="Выберите заказ"
      />
      
      <input
        type="file"
        name="order_file" 
        :multiple="false"
        @change.capture="handleFileSelect"
      >
      
      <label>Цена:</label>
      <InputText 
        :value="totalPrice.toString()"
        :readonly="true"
      />

      <OrderPositions
        :positions="orderPositions"
      />

      <div class="order-create_controls">
        <Button
          type="submit"
          label="Сохранить"
        />
      </div>
    </form>
  </div>
</template>
  
<script lang="ts" setup>
import type { Client } from '~/types/Client';
import type { MiscEnum } from '~/types/MiscEnum';
import type { Order } from '~/types/Order';
import type { OrderPosition } from '~/types/OrderPosition';
import type { OrderedPositions } from '~/types/OrderedPositions';

const createOrderForm = ref();
const miscStore = useMiscEnumsStore();
const companyStore = useCompanyStore();
const calculator = ref<MiscEnum|null>(null);
const name = ref('');
const address = ref('');
const client = ref<Client|null>(null);
const order = ref<Order|null>(null);
const orderPositions = ref<OrderPosition[]>([]);
const totalPrice = ref(0);

watch(order, async () => {
  address.value = order.value?.address ?? '';
  if (order.value?.client_id) {
    try {
      client.value = await $laravelFetch(`/api/clients/${order.value.client_id}`);
    } catch (error) {
      console.log('Ошибка получения клиента ' + order.value.client_id);
    }
  } else {
    client.value = null;
  }
  calculator.value = miscStore.calculators?.find(c => c.id === order.value?.calculator_id) ?? null;
});

const handleFileSelect = (event: any) => {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

const handleFileLoad = async (event: any) => {
  let pricedPositions = JSON.parse(event.target.result)['positions'];
  pricedPositions = await $laravelFetch<OrderedPositions>(`/api/organizations/${companyStore.current?.id}/orders/get-priced-positions`, {
    method: "POST",
    body: {
        positions: pricedPositions
    }
  });
  orderPositions.value = pricedPositions['positions'];
  totalPrice.value = pricedPositions['total_price'];
}

const handleCreateOrder = async () => {
  try {
    const formData = new FormData(createOrderForm.value);
    if (! companyStore.current?.id) {
        throw new Error('Organization Id is required');
    }
    const order = await $laravelFetch<Order>(`/api/organizations/${companyStore.current?.id}/orders`, {
      method: 'POST',
      body: formData
    });
    await navigateTo(`/company/${companyStore.current?.id}/crm/order/${order.id}`);
  } catch (error) {
    console.log(error);
  }
}
</script>
  
<style>

</style>