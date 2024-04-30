<template>
  <div>
    <form
      ref="addUserToOrganizationForm"
      class="flex flex-col gap-2"
      @submit.prevent="handleAddUserOrganization"
    >
      <label for="name">ФИО:</label>
      <InputText 
        name="name" 
      />
      
      <label for="email">Почта:</label>
      <InputText 
        name="email" 
      />
      
      <label for="phone">Телефон:</label>
      <InputText 
        name="phone" 
      />
      
      <Dropdown
        v-model="role"
        :options="miscStore.furnitureMakerRoles?.filter(r => r.name !== 'Owner') ?? undefined" 
        option-label="i18n"
        label
        placeholder="Роль:" 
        class="w-full md:w-14rem"
      />
      <input
        type="text"
        name="furniture_maker_role_id"
        hidden 
        :value="role?.id"
      >

      <Button
        type="submit"
        label="Сохранить"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { MiscEnum } from '~/types/MiscEnum';

const props = defineProps<{
    organizationId?: string|number
}>();

const addUserToOrganizationForm = ref();
const miscStore = useMiscEnumsStore();
const role = ref<MiscEnum|null>(null);

const handleAddUserOrganization = async () => {
  try {
    const formData = new FormData(addUserToOrganizationForm.value);
    if (! props.organizationId) {
        throw new Error('Organization Id is required');
    }
    await $laravelFetch(`/api/register-user/organizations/${props.organizationId}`, {
      method: 'POST',
      body: formData
    });
  } catch (error) {
    console.log(error);
  }
}

</script>

<style>

</style>