<template>
  <Steps
    :model="items"
    :readonly="true"
  >
    <template #item="{ item }">
      <div 
        :class="[
          'flex flex-col m-auto content-center align-items-center justify-content-center align-items-center text-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer text-sm font-medium', 
          { 
            'text-gray-400': (getIndex(item) < stepperIndex),
          }
        ]"
      >
        <i
          v-show="getIndex(item) < stepperIndex"
          class="pi block  pi-check text-sm mr-1 p-[0.1rem] size-4 self-center align-middle text-white bg-gray-300 rounded-[50%]"
          :style="{fontSize: '0.75rem'}"
        />
        <div 
          class="self-center max-w-22"
          :class="[
            'flex flex-col m-auto content-center align-items-center justify-content-center align-items-center text-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer text-sm ', 
            { 
              'font-bold': (getIndex(item) == stepperIndex),
              'font-medium': (getIndex(item) != stepperIndex),
            }
          ]"
        >
          {{ miscStore.orderStatuses?.find(s => s.name == item)?.i18n }}
        </div>
      </div>
    </template>
  </Steps>
</template>

<script lang="ts" setup>
const props = defineProps<{
  activeStatus?: string
}>();

const miscStore = useMiscEnumsStore();
// items must be in correct order
const items = ref([
   "Saved",
   "InProgress",
   //"WaitForClientPreOrder",
   //"SendOrderToFF",
   //"WaitPreOrderFF",
   //"WaitForDetailsDeliveryFF",
   //"WaitForPayOtherHalfForFF",
   "Production",
   "WaitForFinalPayment",
   "ReadyForShipment",
   "Completed"
]);

const getIndex = (status?: string) => {
  return items.value.findIndex(i => i == status);
}

const stepperIndex = computed(() => getIndex(props.activeStatus));
</script>

<style>

</style>