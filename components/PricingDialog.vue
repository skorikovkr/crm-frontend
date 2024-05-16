<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    header="Уровень наценки"
  >
    <PricingEditor />
  </Dialog>
</template>

<script lang="ts" setup>

const visible = defineModel<boolean>('visible');
</script>

<style>

</style>