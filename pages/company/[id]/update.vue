<template>
  <div>
    <form
      id="postOrganization"
      ref="updateOrganization"
      enctype="multipart/form-data"
      class="flex flex-col gap-2"
      @submit.prevent="handleCreateOrganization"
    >
      <label for="name">Название:</label>
      <InputText
        id="name"
        name="name"
        :value="companyStore.current?.name"
      />

      <label for="INN">ИНН:</label>
      <InputText
        id="INN"
        name="INN"
        :value="companyStore.current?.INN"
      />

      <label for="OGRN">ОГРН:</label>
      <InputText
        id="OGRN"
        name="OGRN"
        :value="companyStore.current?.OGRN"
      />

      <label for="KPP">КПП:</label>
      <InputText
        id="KPP"
        name="KPP"
        :value="companyStore.current?.KPP"
      />

      <label for="BIK">БИК:</label>
      <InputText
        id="BIK"
        name="BIK"
        :value="companyStore.current?.BIK"
      />

      <label for="bank_name">Банк:</label>
      <InputText
        id="bank_name"
        name="bank_name"
        :value="companyStore.current?.bank_name"
      />

      <label for="correspondent_account">Корреспондентский счет:</label>
      <InputText
        id="correspondent_account"
        name="correspondent_account"
        :value="companyStore.current?.correspondent_account"
      />

      <label for="description">Описание:</label>
      <InputText
        id="description"
        name="description"
        :value="companyStore.current?.description"
      />

      <label for="address">Адрес:</label>
      <InputText
        id="address"
        name="address"
        :value="companyStore.current?.address"
      />

      <label for="schedule">Расписание:</label>
      <InputText
        id="schedule"
        name="schedule"
        :value="companyStore.current?.schedule"
      />

      <label for="phone">Телефон:</label>
      <InputText
        id="phone"
        name="phone"
        :value="companyStore.current?.phone"
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
        label="Наценки"
        @click="visible = true"
      />

      <Button
        type="submit"
        label="Сохранить"
      />
    </form>
    <PricingDialog 
      v-model:visible="visible"
    />
  </div>
</template>

<script lang="ts" setup>
import type { MiscEnum } from '~/types/MiscEnum';
definePageMeta({ middleware: ["load-company"] });

const updateOrganization = ref();
const visible = ref(false);
const companyStore = useCompanyStore();
const miscEnumStore = useMiscEnumsStore();
const orgType = ref<MiscEnum | null>(miscEnumStore.organizationTypes?.find(t => t.id === companyStore.current?.organization_type_id) ?? null);

const handleCreateOrganization = async () => {
    try {
        const formData = new FormData(updateOrganization.value);
        if (formData.get("logo") === null) {
            formData.delete("logo");
        }
        if (! companyStore.current) {
            throw new Error("Current organization is null.");
        }
        await $laravelFetch(`/api/organizations/${ companyStore.current?.id}`, {
            method: 'POST',
            body: formData
        });
        companyStore.fetch(companyStore.current.id);
    } catch (error) {
        console.log(error);
    }
}

</script>

<style></style>