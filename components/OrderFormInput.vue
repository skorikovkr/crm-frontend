<template>
  <div class="w-full flex flex-col">
    <label for="address">{{ label }}</label>
    <InputText
      :value="order?.name"
      :placeholder="placeholder"
      class="cursor-pointer"
      :readonly="true"
      @click="orderPickerVisible = true"
    />
    <input
      type="text"
      :name="formInputName"
      hidden 
      :value="order?.version_of ?? order?.id"
    >

    <Dialog
      v-model:visible="orderPickerVisible"
      modal
      :header="createDialogHeader"
    >
      <OrderPicker
        :ref="clientPickerRef"
        v-model:selected-order="order"
        :organization-id="companyStore.current?.id"
      />
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from '~/types/Order';
import type OrderPicker from './OrderPicker.vue';

defineProps<{
  createDialogHeader: string,
  formInputName: string,
  placeholder: string,
  label: string
}>();

const emit = defineEmits(['orderChanged']);

const companyStore = useCompanyStore();
const clientPickerRef = (el: Element | ComponentPublicInstance | null) => {
  orderPicker.value = (el as InstanceType<typeof OrderPicker>);
}
const order = defineModel<Order|null>();
const orderPickerVisible = ref(false);
const orderPicker = ref<InstanceType<typeof OrderPicker>>();

watch(order, () => {
  orderPickerVisible.value = false;
  emit('orderChanged', order);
});

watch(orderPickerVisible, async () => {
  if (orderPickerVisible.value) {
    nextTick(async () => {
      await orderPicker.value?.refresh();
    });
  }
})

</script>

<style>

</style>