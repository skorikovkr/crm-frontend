<template>
  <div>
    <form
      id="updateOrganizationPublicInfo"
      ref="updateOrganizationPublicInfo"
      enctype="multipart/form-data"
      class="flex flex-col gap-2"
      @submit.prevent="handleUpdateOrganizationPublicInfo"
    >
      <label for="description">Описание организации:</label>
      <Textarea
        name="description"
        :value="companyStore.current?.description"
      />

      <input
        type="text"
        hidden
        name="images_indexes_added"
        :value="`${photos.toString()}`"
      >

      <div 
        v-for="i in photos"
        :key="i"
        class="portfolio-photo mb-2"
      >
        <label :for="`image_${i}`">Фото {{ i }}:</label>
        <input
          type="file"
          :name="`image_${i}`"
          accept="image/png, image/jpeg"
        >
        <label :for="`image_description_${i}`">Описание изображения:</label>
        <InputText
          :name="`image_description_${i}`"
        />
      </div>
      <Button label="Добавить фото" @click="handleAddPhotoClick" />
    
      <Button
        type="submit"
        label="Сохранить"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['publicInfoUpdated']);

const updateOrganizationPublicInfo = ref();
const photos = ref<number[]>([]);
const companyStore = useCompanyStore();

const handleUpdateOrganizationPublicInfo = async () => {
    try {
        const formData = new FormData(updateOrganizationPublicInfo.value);
        if (! companyStore.current) {
            throw new Error("Current organization is null.");
        }
        await $laravelFetch(`/api/organizations/${ companyStore.current?.id}/update-public-info`, {
            method: 'POST',
            body: formData
        });
        emit('publicInfoUpdated');
    } catch (error) {
        console.log(error);
    }
}

const handleAddPhotoClick = () => {
    photos.value.push(photos.value.length + 1);
}
</script>

<style>

</style>