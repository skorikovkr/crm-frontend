<script lang="ts" setup>
import Button from 'primevue/button';
import type { Company } from '~/types/Company';

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
const sendApplicationError = ref<string | null>(null);
const sendApplicationSuccess = ref<string | null>(null);

const sendApplication = async () => {
  let data = null;
  try {
    data = await $laravelFetch('/api/applications', {
      body: application.value,
      method: 'post'
    });
    sendApplicationSuccess.value = data.message;
  } catch (err) {
    sendApplicationError.value = data?.message;
  }
}

watch(visible, () => {
  if (!visible.value) {
    sendApplicationSuccess.value = null;
    sendApplicationError.value = null;
  }
})

const { pending, error, data: organizations } = await useLaravelFetch<Company[]>('/api/organizations');

</script>

<template>
  <div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Подача заявки на создание CRM"
      :style="{ width: '25rem' }"
    >
      <div class="flex align-items-center gap-3 mb-3">
        <label
          for="name"
          class="font-semibold w-6rem"
        >ФИО</label>
        <InputText
          id="namr"
          v-model="application.name"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label
          for="email"
          class="font-semibold w-6rem"
        >Электронная почта</label>
        <InputText
          id="email"
          v-model="application.email"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label
          for="phone"
          class="font-semibold w-6rem"
        >Телефон</label>
        <InputText
          id="phone"
          v-model="application.phone"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div
        v-show="sendApplicationError"
        class="flex align-items-center gap-3 mb-5"
      >
        <p
          for="phone"
          class="font-semibold w-6rem text-red-800"
        >
          {{ sendApplicationError }}
        </p>
      </div>
      <div
        v-show="sendApplicationSuccess"
        class="flex align-items-center gap-3 mb-5"
      >
        <p
          for="phone"
          class="font-semibold w-6rem text-green-600"
        >
          {{ sendApplicationSuccess }}
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

    <div
      class="
        about
        relative
        pt-12
        mb-4
        overflow-hidden
        block
        z-10
        h-[500px]
        bg-no-repeat
        bg-cover
        bg-[url('/index_page_about.jpg')]
        before:content-['']
        before:absolute
        before:inset-0
        before:block
        before:bg-gradient-to-r
        before:from-white
        before:to-transparent
        before:z-[-5]
      "
    >
      <h1 class="text-3xl font-semibold mb-4">
        О нас
      </h1>
      <p class="w-1/2 mb-4">
        Наша компания является мебельной фабрикой, которая уже 15 лет производит мебельные детали, столешницы, фасады и другие материалы под заказ. Компания сотрудничает посредством B2B с мебельщиками.
      </p>
      <Button
        label="Оставить заявку" 
        @click="visible = true" 
      />
    </div>

    <div
      v-if="!pending && !error"
      class="partners"
    >
      <h3 class="text-3xl font-semibold mb-4">
        С нами сотрудничают:
      </h3>
      <div
        v-for="org in organizations" 
        :key="org.id" 
        class="organization"
      >
        <NuxtLink :to="`/company/${org.id}/public`">
          <h4>{{ org.name }}</h4>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>

</style>