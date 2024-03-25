<script lang="ts" setup>
import Button from 'primevue/button';

definePageMeta({
  layout: 'index-page'
});

const visible = ref(false);
  // TODO: сделать страницу без header тут со списком организаций "которые сотрудничают". они должны быть кликабельны, чтобы crawler мог их индексировать
  // и еще кнопка "Зайти в личный кабинет, которая будет вести на login"
  // это было для гостя. для авторизованного будет браться его прошлая организация (можно добавить в userStore) и отображаться публичная страница (редирект на /company/id/public)
const application = ref({
  name: '',
  phone: '',
  email: ''
});
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const sendApplication = async () => {
  let data = null;
  try {
    data = await $laravelFetch('/api/application', {
      body: application.value,
      method: 'post'
    });
    success.value = data.message;
  } catch (err) {
    error.value = data?.message;
  }
}

watch(visible, () => {
  if (!visible.value) {
    success.value = null;
    error.value = null;
  }
})
</script>

<template>
  <div>
    <Dialog v-model:visible="visible" modal header="Подача заявки на создание CRM" :style="{ width: '25rem' }">
      <div class="flex align-items-center gap-3 mb-3">
        <label for="name" class="font-semibold w-6rem">ФИО</label>
        <InputText v-model="application.name" id="namr" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="email" class="font-semibold w-6rem">Электронная почта</label>
        <InputText v-model="application.email" id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="phone" class="font-semibold w-6rem">Телефон</label>
        <InputText v-model="application.phone" id="phone" class="flex-auto" autocomplete="off" />
      </div>
      <div v-show="error" class="flex align-items-center gap-3 mb-5">
        <p for="phone" class="font-semibold w-6rem text-red-800">
          {{ error }}
        </p>
      </div>
      <div v-show="success" class="flex align-items-center gap-3 mb-5">
        <p for="phone" class="font-semibold w-6rem text-green-600">
          {{ success }}
        </p>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button 
          type="button"
          label="Отправить" 
          @click="sendApplication" 
        />
      </div>
    </Dialog>
    <NuxtLink to="/login">
      <Button label="Зайти в личный кабинет" />
    </NuxtLink>
    <Button
      label="Оставить заявку" 
      @click="visible = true" 
    />
    <h3>С нами сотрудничают:</h3>
  </div>
</template>

<style>

</style>