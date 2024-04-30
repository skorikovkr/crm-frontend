<template>
  <div>
    <form
      ref="createClient"
      class="flex flex-col gap-2"
      @submit.prevent="handleCreateClient"
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

      <Button
        type="submit"
        label="Сохранить"
      />
    </form>
  </div>
</template>
  
<script lang="ts" setup>
  import type { Client } from '~/types/Client';
  
  const props = defineProps<{
      organizationId?: string|number
  }>();
  const emit = defineEmits(['clientCreated']);

  const createClient = ref();
  
  const handleCreateClient = async () => {
    try {
      const formData = new FormData(createClient.value);
      if (! props.organizationId) {
          throw new Error('Organization Id is required');
      }
      const client = await $laravelFetch<Client>(`/api/organizations/${props.organizationId}/client`, {
        method: 'POST',
        body: formData
      });
      emit('clientCreated', client);
    } catch (error) {
      console.log(error);
    }
  }
  
  </script>
  
  <style>
  
  </style>