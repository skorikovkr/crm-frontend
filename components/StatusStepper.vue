<template>
  <Steps
    :model="items"
    :readonly="true"
  >
    <template #item="{ item }">
      <span 
        :class="[
          'inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer', 
          { 
            'bg-primary': (getIndex(item) <= stepperIndex), 
            'surface-overlay text-primary': (getIndex(item) > stepperIndex) 
          }
        ]"
      >
        <i
          v-show="getIndex(item) <= stepperIndex"
          class="pi pi-check mr-1"
        /> {{ miscStore.orderStatuses?.find(s => s.name == item)?.i18n }}
      </span>
    </template>
  </Steps>
</template>

<script lang="ts" setup>
const props = defineProps<{
  activeStatus?: string
}>();

const miscStore = useMiscEnumsStore();
const items = ref([
   "Saved",
   "InProgress",
   "WaitForClientPreOrder",
   "Production",
   "WaitForClientPayOtherHalf",
   "ReadyForShipment",
   "Completed"
]);

const getIndex = (status?: string) => {
  switch (status) {
    case "Saved":
        return 0;
    case "InProgress":
        return 1;
    case "WaitForClientPreOrder":
        return 2;
    case "Production":
        return 3;
    case "WaitForClientPayOtherHalf":
        return 4;
    case "ReadyForShipment":
        return 5;
    case "Completed":
        return 6;
    default:
        return -1;
  }
}

const stepperIndex = computed(() => getIndex(props.activeStatus));
</script>

<style>

</style>