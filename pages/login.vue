<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

definePageMeta({
  layout: 'index-page'
});

const router = useRouter();
const route = useRoute();
const { login, user } = useUserStore();

const data = reactive({
  email: "",
  password: "",
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    status.value = "";
    return login(data);
  },
  {
    onSuccess: () => {
        if (user?.last_organization_id) {
            return router.push(`/company/${user.last_organization_id}/public`);
        }
        return router.push("/")
    },
  }
);
</script>

<template>
  <div>
    <div>{{ status }}</div>

    <form @submit.prevent="submit">
      <div>
        <label for="email">Почта</label>
        <div>{{ errors.email?.[0] }}</div>
        <input
          id="email"
          v-model="data.email"
          type="email"
          class="block mt-1 w-full"
          required
          autoFocus
        >
      </div>

      <div class="mt-4">
        <label for="password">Пароль</label>
        <div
          v-for="err in errors.password"
          :key="err"
        >
          {{ err }}
        </div>
        <input
          id="password"
          v-model="data.password"
          type="password"
          class="block mt-1 w-full"
          required
          autoComplete="current-password"
        >
      </div>

      <!-- Remember Me -->
      <div class="block mt-4">
        <label
          for="remember" 
          class="inline-flex items-center"
        >
          <input
            id="remember"
            v-model="data.remember"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
          <span class="ml-2 text-sm text-gray-600"> Запомнить меня </span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <input 
          :disabled="inProgress" 
          class="ml-3" 
          type="submit" 
          value="Логин"
        >
      </div>
    </form>
  </div>
</template>