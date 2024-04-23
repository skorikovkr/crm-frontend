<template>
  <div>
    <form
      id="postOrganization"
      ref="postOrganization"
      enctype="multipart/form-data"
      @submit.prevent="handleCreateOrganization"
    >
      <label for="name">Название:</label>
      <InputText 
        id="name"
        name="name" 
      />
      
      <label for="INN">ИНН:</label>
      <InputText 
        id="INN"
        name="INN" 
      />
      
      <label for="OGRN">ОГРН:</label>
      <InputText 
        id="OGRN"
        name="OGRN" 
      />
      
      <label for="KPP">КПП:</label>
      <InputText 
        id="KPP"
        name="KPP" 
      />
      
      <label for="BIK">БИК:</label>
      <InputText 
        id="BIK"
        name="BIK" 
      />
      
      <label for="bank_name">Банк:</label>
      <InputText 
        id="bank_name"
        name="bank_name" 
      />
      
      <label for="correspondent_account">Корреспондентский счет:</label>
      <InputText 
        id="correspondent_account"
        name="correspondent_account" 
      />
      
      <label for="description">Описание:</label>
      <InputText 
        id="description"
        name="description" 
      />
      
      <label for="address">Адрес:</label>
      <InputText 
        id="address"
        name="address" 
      />
      
      <label for="schedule">Расписание:</label>
      <InputText 
        id="schedule"
        name="schedule" 
      />
      
      <label for="phone">Телефон:</label>
      <InputText 
        id="phone"
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
        id="logo"
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