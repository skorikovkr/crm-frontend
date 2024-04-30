<template>
  <div>
    <form
      ref="postOrganization"
      enctype="multipart/form-data"
      class="flex flex-col gap-2"
      @submit.prevent="handleCreateOrganization"
    >
      <label for="name">Название:</label>
      <InputText 
        name="name" 
      />
      
      <label for="INN">ИНН:</label>
      <InputText 
        name="INN" 
      />
      
      <label for="OGRN">ОГРН:</label>
      <InputText 
        name="OGRN" 
      />
      
      <label for="KPP">КПП:</label>
      <InputText 
        name="KPP" 
      />
      
      <label for="BIK">БИК:</label>
      <InputText 
        name="BIK" 
      />
      
      <label for="bank_name">Банк:</label>
      <InputText
        name="bank_name" 
      />
      
      <label for="correspondent_account">Корреспондентский счет:</label>
      <InputText
        name="correspondent_account" 
      />
      
      <label for="description">Описание:</label>
      <InputText
        name="description" 
      />
      
      <label for="address">Адрес:</label>
      <InputText
        name="address" 
      />
      
      <label for="schedule">Расписание:</label>
      <InputText
        name="schedule" 
      />
      
      <label for="phone">Телефон:</label>
      <InputText
        name="phone" 
      />
      
      <Dropdown
        v-model="orgType"
        :options="miscEnumStore.organizationTypes ?? undefined" 
        option-label="i18n"
        label
        placeholder="Тип организации:" 
        class="w-full md:w-14rem"
      />
      <input
        type="text"
        name="organization_type_id"
        hidden 
        :value="orgType?.id"
      >

      <input
        type="file"
        name="logo"
        accept="image/png, image/jpeg"
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

const postOrganization = ref();
const orgType = ref<MiscEnum|null>(null);

const miscEnumStore = useMiscEnumsStore();

const handleCreateOrganization = async () => {
  try {
    const formData = new FormData(postOrganization.value);
    const data = await $laravelFetch('/api/organizations', {
      method: 'POST',
      body: formData
    });
    navigateTo(`/company/${data.id}/public`);
  } catch (error) {
    console.log(error);
  }
}

</script>

<style>

</style>