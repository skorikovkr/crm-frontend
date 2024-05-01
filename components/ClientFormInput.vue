<template>
  <div class="w-full flex flex-col">
    <label for="address">{{ label }}</label>
    <InputText
      :value="client?.name"
      :placeholder="placeholder"
      class="cursor-pointer"
      :readonly="true"
      @click="clientPickerVisible = true"
    />
    <input
      type="text"
      :name="formInputName"
      hidden 
      :value="client?.id"
    >

    <Dialog
      v-model:visible="clientPickerVisible"
      :draggable="false"
      modal
      :header="createDialogHeader"
    >
      <ClientPicker
        :ref="clientPickerRef"
        v-model:selectedClient="client"
        :organization-id="companyStore.current?.id"
      />
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Client } from '~/types/Client';
import type ClientPicker from '~/components/ClientPicker.vue';

defineProps<{
  createDialogHeader: string,
  formInputName: string,
  placeholder: string,
  label: string
}>();

const companyStore = useCompanyStore();
const clientPickerRef = (el: Element | ComponentPublicInstance | null) => {
  clientPicker.value = (el as InstanceType<typeof ClientPicker>);
}
const client = defineModel<Client|null>();
const clientPickerVisible = ref(false);
const clientPicker = ref<InstanceType<typeof ClientPicker>>();

watch(client, () => {
  clientPickerVisible.value = false;
});

watch(clientPickerVisible, async () => {
  if (clientPickerVisible.value) {
    nextTick(async () => {
      await clientPicker.value?.refresh();
    });
  }
})

</script>

<style>

</style>